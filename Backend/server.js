const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Nano = require('nano');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// CouchDB connection
const nano = Nano('http://Wilson:W1l$0n30@127.0.0.1:5984');
const dbName = 'uploads';
const ratingsDbName = 'video_ratings';

let db;
let ratingsDb;

async function initDB() {
  try {
    const dbList = await nano.db.list();

    if (!dbList.includes(dbName)) {
      await nano.db.create(dbName);
      console.log(`Database '${dbName}' created.`);
    }
    if (!dbList.includes(ratingsDbName)) {
      await nano.db.create(ratingsDbName);
      console.log(`Database '${ratingsDbName}' created.`);
    }

    db = nano.db.use(dbName);
    ratingsDb = nano.db.use(ratingsDbName);

    // Create index for uploads DB
    await db.createIndex({
      index: { fields: ['projectCategory', 'createdAt'] },
      name: 'projectCategory_createdAt_index',
      type: 'json',
    });
    console.log('Index created for projectCategory and createdAt');

    // Create index for ratings DB (videoId)
    await ratingsDb.createIndex({
      index: { fields: ['videoId'] },
      name: 'videoId_index',
      type: 'json',
    });
    console.log('Index created for videoId in ratingsDb');
    await db.createIndex({
    index: { fields: ['createdAt'] },
    name: 'createdAt_index',
    type: 'json',
  });


  } catch (err) {
    console.error('Error initializing DBs:', err);
    process.exit(1); // stop app jika gagal init DB
  }
}

// Endpoint POST untuk simpan data upload
app.post('/api/upload', async (req, res) => {
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
    };

    const response = await db.insert(doc);
    res.status(201).json({ message: 'Upload data saved', id: response.id });
  } catch (error) {
    console.error('Failed to save upload data:', error);
    res.status(500).json({ message: 'Failed to save data' });
  }
});

// Endpoint POST untuk menyimpan rating baru
app.post('/api/ratings', async (req, res) => {
  const { videoId, rating } = req.body;

  if (!videoId || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Invalid videoId or rating' });
  }

  try {
    await ratingsDb.insert({
      videoId,
      rating,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: 'Rating saved' });
  } catch (error) {
    console.error('Failed to save rating:', error);
    res.status(500).json({ message: 'Failed to save rating' });
  }
});

// Endpoint GET untuk ambil video berdasarkan material
app.get('/api/videos', async (req, res) => {
  const { material } = req.query;

  if (!material) {
    return res.status(400).json({ message: 'Missing material query parameter' });
  }

  try {
    const response = await db.find({
      selector: {
        projectCategory: material.toLowerCase(),
      },
      sort: [{ createdAt: 'desc' }],
    });

    // Ambil rating rata-rata untuk tiap video secara paralel
    const videos = await Promise.all(
      response.docs.map(async (doc) => {
        const ratingResp = await ratingsDb.find({
          selector: { videoId: doc._id },
        });
        const ratings = ratingResp.docs.map((d) => d.rating);
        let averageRating = 0;
        if (ratings.length > 0) {
          const sum = ratings.reduce((a, b) => a + b, 0);
          averageRating = parseFloat((sum / ratings.length).toFixed(2));
        }

        return {
          id: doc._id,
          title: doc.projectTitle,
          thumbnail: doc.thumbnailURL,
          uploader: 'Anonymous',
          date: new Date(doc.createdAt).toLocaleDateString(),
          material: doc.projectCategory,
          rating: averageRating,
        };
      })
    );

    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Failed to fetch videos' });
  }
});

// Endpoint GET untuk ambil rata-rata rating video tertentu
app.get('/api/ratings/:videoId', async (req, res) => {
  const { videoId } = req.params;

  try {
    const response = await ratingsDb.find({
      selector: { videoId },
    });

    const ratings = response.docs.map((doc) => doc.rating);

    if (ratings.length === 0) {
      return res.json({ averageRating: 0 });
    }

    const sum = ratings.reduce((acc, val) => acc + val, 0);
    const average = parseFloat((sum / ratings.length).toFixed(2));

    res.json({ averageRating: average });
  } catch (err) {
    console.error('Failed to get ratings:', err);
    res.status(500).json({ message: 'Failed to get ratings' });
  }
});

app.get('/api/videos/top-rated', async (req, res) => {
  try {
    const response = await db.find({ selector: {}, sort: [{ createdAt: 'desc' }] });

    const videos = await Promise.all(
      response.docs.map(async (doc) => {
        const ratingResp = await ratingsDb.find({
          selector: { videoId: doc._id },
        });
        const ratings = ratingResp.docs.map((d) => d.rating);
        let averageRating = 0;
        if (ratings.length > 0) {
          const sum = ratings.reduce((a, b) => a + b, 0);
          averageRating = parseFloat((sum / ratings.length).toFixed(2));
        }

        return {
          id: doc._id,
          title: doc.projectTitle,
          thumbnail: doc.thumbnailURL,
          uploader: 'Anonymous',
          date: new Date(doc.createdAt).toLocaleDateString(),
          material: doc.projectCategory,
          rating: averageRating,
        };
      })
    );

    // Sort berdasarkan rating tertinggi
    const sorted = videos.sort((a, b) => b.rating - a.rating);

    res.json(sorted);
  } catch (error) {
    console.error('Error fetching top-rated videos:', error);
    res.status(500).json({ message: 'Failed to fetch top-rated videos' });
  }
});


// Endpoint GET detail video berdasarkan ID
app.get('/api/videos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await db.get(id);

    // Ambil rata-rata rating video
    const ratingResp = await ratingsDb.find({
      selector: { videoId: id },
    });
    const ratings = ratingResp.docs.map((d) => d.rating);
    let averageRating = 0;
    if (ratings.length > 0) {
      const sum = ratings.reduce((a, b) => a + b, 0);
      averageRating = parseFloat((sum / ratings.length).toFixed(2));
    }

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

// Jalankan server setelah inisialisasi DB selesai
initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
