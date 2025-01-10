// src/components/postcard.jsx
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={
          post.image
            ? post.image // Use the direct image URL from your backend
            : "https://via.placeholder.com/500x300" // Default placeholder
        }
        alt={post.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
        <p
          className="text-gray-600 mt-2 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></p>
        <Link
          to={`/post/${post.slug}`}
          className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;
