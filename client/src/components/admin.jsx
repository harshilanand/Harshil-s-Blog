// src/components/admin.jsx
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Admin() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getPosts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/post/deletePost/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete post');
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-panel bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Posts</h2>
        <Link to="/create" className="px-4 py-2 bg-teal-500 text-white font-semibold rounded shadow hover:bg-blue-600">Create New Post</Link>
      </div>
      <div className="mb-6 text-right">
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600">Logout</button>
      </div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="post-card bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200">
              <h3 className="text-lg font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.content.slice(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <Link to={`/post/${post.slug}`} className="text-blue-500 hover:underline">View</Link>
                <button onClick={() => handleDelete(post._id)} className="px-3 py-1 bg-red-500 text-white font-semibold rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No posts found.</p>
      )}
    </div>
  );
}
