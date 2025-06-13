const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Nano = require('nano');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const nano = Nano('http://Wilson:W1l$0n30@127.0.0.1:5984');
const dbName = 'uploads';
const ratingsDbName = 'video_ratings';
const usersDbName = 'users';
const commentsDbName = 'comments'; 

let db, ratingsDb, usersDb, commentsDb; 

async function initDB() {
    try {
        const dbList = await nano.db.list();

        if (!dbList.includes(dbName)) await nano.db.create(dbName);
        if (!dbList.includes(ratingsDbName)) await nano.db.create(ratingsDbName);
        if (!dbList.includes(usersDbName)) await nano.db.create(usersDbName);
        if (!dbList.includes(commentsDbName)) await nano.db.create(commentsDbName); 

        db = nano.db.use(dbName);
        ratingsDb = nano.db.use(ratingsDbName);
        usersDb = nano.db.use(usersDbName);
        commentsDb = nano.db.use(commentsDbName); 

        await db.createIndex({ index: { fields: ['projectCategory', 'createdAt'] }, name: 'projectCategory_createdAt_index', type: 'json' });
        await db.createIndex({ index: { fields: ['createdAt'] }, name: 'createdAt_index', type: 'json' });
        await ratingsDb.createIndex({ index: { fields: ['videoId'] }, name: 'videoId_index', type: 'json' });
        await commentsDb.createIndex({ index: { fields: ['videoId', 'createdAt'] }, name: 'videoId_createdAt_index', type: 'json' }); 

        console.log('Databases and indexes initialized');
    } catch (err) {
        console.error('Error initializing DBs:', err);
        process.exit(1);
    }
}

// --- AUTHENTICATION MIDDLEWARE ---
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(403).json({ message: 'No Token Provided' });

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// --- AUTH ROUTES ---
app.post('/auth/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existing = await usersDb.find({ selector: { email } });
        if (existing.docs.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = { username, email, password: hashPassword, createdAt: new Date().toISOString() };
        const response = await usersDb.insert(newUser);

        return res.status(201).json({ message: 'User created', id: response.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await usersDb.find({ selector: { username } });
        if (result.docs.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = result.docs[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Wrong password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '3h' });
        res.status(200).json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/auth/home', verifyToken, async (req, res) => {
    try {
        const user = await usersDb.get(req.userId);
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- VIDEO UPLOAD ---
app.post('/api/upload', verifyToken, async (req, res) => {
    const {
        videoURL,
        thumbnailName,
        thumbnailURL,
        projectTitle,
        projectCategory,
        projectDescription,
    } = req.body;

    if (!videoURL || !thumbnailURL || !projectTitle || !projectCategory) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const doc = {
            videoURL,
            thumbnailName,
            thumbnailURL,
            projectTitle,
            projectCategory: projectCategory.toLowerCase(),
            projectDescription,
            createdAt: new Date().toISOString(),
            uploaderId: req.userId,
        };

        const response = await db.insert(doc);
        res.status(201).json({ message: 'Upload data saved', id: response.id });
    } catch (error) {
        console.error('Failed to save upload data:', error);
        res.status(500).json({ message: 'Failed to save data' });
    }
});

// --- SAVE RATING ---
app.post('/api/ratings', verifyToken, async (req, res) => {
    const { videoId, rating } = req.body;
    if (!videoId || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Invalid videoId or rating' });
    }

    try {
        await ratingsDb.insert({
            videoId,
            rating,
            createdAt: new Date().toISOString(),
            userId: req.userId,
        });

        res.status(201).json({ message: 'Rating saved' });
    } catch (error) {
        console.error('Failed to save rating:', error);
        res.status(500).json({ message: 'Failed to save rating' });
    }
});

// --- GET VIDEOS BY MATERIAL ---
app.get('/api/videos', async (req, res) => {
    const { material } = req.query;
    if (!material) return res.status(400).json({ message: 'Missing material query parameter' });

    try {
        const response = await db.find({
            selector: { projectCategory: material.toLowerCase() },
            sort: [{ createdAt: 'desc' }],
        });

        const videos = await Promise.all(response.docs.map(async (doc) => {
            const ratingResp = await ratingsDb.find({ selector: { videoId: doc._id } });
            const ratings = ratingResp.docs.map((d) => d.rating);
            const averageRating = ratings.length ? parseFloat((ratings.reduce((a, b) => a + b) / ratings.length).toFixed(2)) : 0;

            return {
                id: doc._id,
                title: doc.projectTitle,
                thumbnail: doc.thumbnailURL,
                uploader: 'Anonymous',
                date: new Date(doc.createdAt).toLocaleDateString(),
                material: doc.projectCategory,
                rating: averageRating,
            };
        }));

        res.json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ message: 'Failed to fetch videos' });
    }
});

// --- TOP-RATED VIDEOS ---
app.get('/api/videos/top-rated', async (req, res) => {
    try {
        const response = await db.find({ selector: { _id: { '$gt': null } } });
        const videos = await Promise.all(response.docs.map(async (doc) => {
            const ratingResp = await ratingsDb.find({ selector: { videoId: doc._id } });
            const ratings = ratingResp.docs.map((d) => d.rating);
            const averageRating = ratings.length ? parseFloat((ratings.reduce((a, b) => a + b) / ratings.length).toFixed(2)) : 0;

            return {
                id: doc._id,
                title: doc.projectTitle,
                thumbnail: doc.thumbnailURL,
                uploader: 'Anonymous',
                date: new Date(doc.createdAt).toLocaleDateString(),
                material: doc.projectCategory,
                rating: averageRating,
            };
        }));

        const sortedVideos = videos.sort((a, b) => b.rating - a.rating);
        res.json(sortedVideos);
    } catch (error) {
        console.error('Error fetching top-rated videos:', error);
        res.status(500).json({ message: 'Failed to fetch top-rated videos' });
    }
});

// --- GET VIDEO DETAIL ---
app.get('/api/videos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await db.get(id);
        const ratingResp = await ratingsDb.find({ selector: { videoId: id } });
        const ratings = ratingResp.docs.map((d) => d.rating);
        const averageRating = ratings.length ? parseFloat((ratings.reduce((a, b) => a + b) / ratings.length).toFixed(2)) : 0;

        res.json({
            id: doc._id,
            title: doc.projectTitle,
            videoURL: doc.videoURL,
            thumbnailURL: doc.thumbnailURL,
            description: doc.projectDescription,
            uploader: 'Anonymous',
            date: new Date(doc.createdAt).toLocaleDateString(),
            material: doc.projectCategory,
            rating: averageRating,
        });
    } catch (error) {
        console.error('Error fetching video:', error);
        res.status(404).json({ message: 'Video not found' });
    }
});

// --- COMMENT SECTION --- 
app.post('/api/comments', verifyToken, async (req, res) => {
    const { videoId, comment } = req.body;
    if (!videoId || !comment) {
        return res.status(400).json({ message: 'Missing videoId or comment' });
    }

    try {
        const user = await usersDb.get(req.userId);
        const commentDoc = {
            videoId,
            userId: req.userId,
            username: user.username,
            comment,
            createdAt: new Date().toISOString(),
        };

        await commentsDb.insert(commentDoc);
        res.status(201).json({ message: 'Comment added' });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Failed to add comment' });
    }
});

app.get('/api/comments/:videoId', async (req, res) => {
    const { videoId } = req.params;
    try {
        const response = await commentsDb.find({
            selector: { videoId },
            sort: [{ createdAt: 'asc' }]
        });

        const comments = response.docs.map(doc => ({
            username: doc.username,
            comment: doc.comment,
            createdAt: doc.createdAt
        }));

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Failed to fetch comments' });
    }
});

// --- START SERVER ---
initDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
