import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://harshil-s-blog.onrender.com/api/post/getPosts");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts.reverse()); // Reverse the order here
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
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white via-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          All Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                {post.image && (
                  <img
                    src={post.image || "https://via.placeholder.com/500x300"}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {post.title}
                  </h2>
                  <p
                    className="text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></p>
                  <a
                    href={`/post/${post.slug}`}
                    className="text-teal-500 mt-4 block text-right hover:underline"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No posts found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
