import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home  from './pages/home'
import Login  from './pages/login'
import Search  from './pages/SearchPage'
import SearchMaterial from './pages/SearchByMaterial'
import Upload from './pages/UploadPage'
import Layout from './Layout'
import SignUp from './pages/SignUp'
import Videp from './pages/videp'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/search' element={<Search />} />
          <Route path='/watch/:id' element={<Videp />} />
          <Route path='/searchmaterial' element={<SearchMaterial />} />
          <Route path='/upload' element={<Upload />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
