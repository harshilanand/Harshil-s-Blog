import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Home from './pages/home';
import About from './pages/about';
import Posts from './pages/posts';
import Post from './pages/post';
import CreatePost from './pages/createpost';
import Navbar from './components/navbar';
import Admin from './components/admin';
import Login from './pages/login';
import Signup from './pages/signup';
import { AuthContext } from './context/AuthContext';

import PropTypes from 'prop-types';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
