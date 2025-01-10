import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For accessing dynamic route parameters

export default function Post() {
  const { slug } = useParams(); // Get the slug from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Track the loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/post/getPost/${slug}`);
        const data = await res.json();
        if (res.ok) {
          setPost(data.post);
          setLoading(false); // Stop loading after fetching post
        } else {
          setError(data.message || 'Failed to fetch post');
          setLoading(false);
        }
      } catch {
        setError('An error occurred while fetching the post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <p>Loading...</p>; // Show loading until data is fetched
  if (error) return <p>{error}</p>; // Show error message if something goes wrong

  return (
    <div className="post-details max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {post && (
        <>
          <h1 className="text-4xl font-bold text-center mb-6">{post.title}</h1>
          {/* Check if image exists, if not use a default placeholder */}
          <div className="mb-6">
            {post.image ? (
              <img
                src={post.image} // Assuming the image path is relative from the 'uploads' folder
                alt={post.title}
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
            ) : (
              <img
                src="/path/to/default-image.jpg" // Default image if no image exists
                alt="Default Image"
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
            )}
          </div>
          {/* Render content with HTML interpretation */}
          <p
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></p>
        </>
      )}
    </div>
  );
}
