import { useState, useEffect } from 'react'
import './App.css'
import Updater from './components/Updater.jsx'
import Creator from './components/Creator.jsx'
import Post from './components/Post.jsx'
import { Route, Routes, Link } from "react-router-dom";
import Home from './components/Home'

function App() {

  return (
    <>
      <nav className="sideBar">
        <h1>ScienceHub</h1>
        <h1></h1>
        <Link to="/home">Home</Link>
        <h1></h1>
        <Link to="/creator">Post Creator</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="creator" element={<Creator />} />
        <Route path="updater" element={<Updater />} />
        <Route path="post" element={<Post />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
};

export default App
