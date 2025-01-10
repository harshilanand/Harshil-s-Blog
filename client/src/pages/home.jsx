import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "@components/postcard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/post/getPosts");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts.reverse()); // Reverse the order to display the latest posts first
        } else {
          setError(data.message || "Failed to fetch posts");
        }
      } catch {
        setError("An error occurred while fetching posts");
      }
    };
    fetchPosts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-gradient-to-b from-white via-gray-100 to-gray-200 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center gap-6 px-6 py-20 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-wide">
          Welcome to My Blog
        </h1>
        <p className="text-gray-600 text-sm sm:text-lg max-w-2xl leading-relaxed">
          Dive into a variety of articles, tutorials, and projects that inspire and educate.
        </p>
        <Link
          to="/posts"
          className="px-6 py-2 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out font-medium text-sm sm:text-base"
        >
          Explore All Posts
        </Link>
      </div>

      {/* Recent Posts Section */}
      <div className="bg-white shadow-lg rounded-lg max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Recent Posts
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {posts.length > 0 ? (
            posts.slice(0, 3).map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p className="text-center text-gray-500">
              No posts available at the moment. Check back soon!
            </p>
          )}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/posts"
            className="px-6 py-2 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out font-medium text-sm sm:text-base"
          >
            View All Posts
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-b from-gray-100 via-white to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">About This Website</h2>
          <p className="text-gray-600 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed">
            This blog showcases my journey in web development, software engineering, and programming. Here, you&#39ll find insightful articles, updates on my latest projects, and a glimpse into the world of technology.
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white shadow-lg py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">My Projects</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {/* Replace with dynamic project data */}
            <div className="bg-gray-100 rounded-lg shadow-md p-6 max-w-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Title 1</h3>
              <p className="text-gray-600 text-sm">
                Brief description of the project and the technologies used.
              </p>
              <a
                href="/projects/project1"
                className="text-teal-500 mt-4 block text-right hover:underline"
              >
                Learn More →
              </a>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6 max-w-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Title 2</h3>
              <p className="text-gray-600 text-sm">
                Brief description of the project and the technologies used.
              </p>
              <a
                href="/projects/project2"
                className="text-teal-500 mt-4 block text-right hover:underline"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
