// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NovelDetail from './pages/NovelDetail';
import WriteNovel from './pages/WriteNovel';
import Reader from './pages/Reader';
import Profile from './pages/Profile';
import EditNovel from './pages/EditNovel';
import AddChapter from './pages/AddChapter';
import Dashboard from './pages/Dashboard';
import AuthorProfile from './pages/AuthorProfile';
import EditProfile from './pages/EditProfile';
import Home from "./pages/Home";
// ...
<Route path="/" element={<Home />} />

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novel/:id" element={<NovelDetail />} />
        <Route path="/write" element={<WriteNovel />} />
        <Route path="/read/:id/:chapterId" element={<Reader />} />
        <Route path="/profile/:uid" element={<Profile />} />
        <Route path="/edit/:id" element={<EditNovel />} />
        <Route path="/add-chapter/:id" element={<AddChapter />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/author/:userId" element={<AuthorProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default App;// src/App.js import React from 'react'; import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; import Home from './pages/Home'; import NovelDetail from './pages/NovelDetail'; import WriteNovel from './pages/WriteNovel'; import Reader from './pages/Reader'; import Profile from './pages/Profile'; import EditNovel from './pages/EditNovel'; import AddChapter from './pages/AddChapter'; import Dashboard from './pages/Dashboard';

const App = () => { return ( <Router> <Routes> <Route path="/" element={<Home />} /> <Route path="/novel/:id" element={<NovelDetail />} /> <Route path="/write" element={<WriteNovel />} /> <Route path="/read/:id/:chapterId" element={<Reader />} /> <Route path="/profile/:uid" element={<Profile />} /> <Route path="/edit/:id" element={<EditNovel />} /> <Route path="/add-chapter/:id" element={<AddChapter />} /> <Route path="/dashboard" element={<Dashboard />} /> </Routes> </Router> ); };

export default App;
