import { useState, useEffect } from 'react';
import { Button, TextInput, Select, FileInput, Alert } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  // Handle Image Upload
  const handleImageUpload = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);

      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('upload_preset', 'myblog'); // Ensure this preset is correct

      console.log('Selected File:', file); // Debugging: Log the selected file

      setImageUploadProgress(true);

      // Replace fetch with axios
      const res = await axios.post('https://api.cloudinary.com/v1_1/dvxmovvii/image/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setImageUploadProgress(progress);
          }
        },
      });

      console.log('Cloudinary Response:', res.data); // Debugging: Check the response from Cloudinary

      if (res.data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          image: res.data.secure_url, // Save Cloudinary URL
        }));
      } else {
        setImageUploadError('Image upload failed');
      }

      setImageUploadProgress(false);
    } catch (error) {
      console.error('Image upload error:', error.response || error); // Debugging: Check error details
      setImageUploadError('Image upload failed');
      setImageUploadProgress(false);
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the form data to debug the values
    console.log('Form Data before submit:', formData);

    try {
      // Validate required fields before submission
      if (!formData.title || !formData.content || !formData.slug || !formData.author || !formData.image) {
        setPublishError('All fields are required');
        return;
      }

      const res = await axios.post('https://harshil-s-blog.onrender.com/api/post/createPost', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.data && res.data.post) {
        setPublishError(null);
        navigate(`/post/${res.data.post.slug}`);
      } else {
        setPublishError(res.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Submit error:', error.response || error); // Debugging: Check error details
      setPublishError(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Generate slug from title
  useEffect(() => {
    if (formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-/,'') // Remove leading hyphen if present
        .replace(/-$/, ''); // Remove trailing hyphen if present
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title]);

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Select
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
            <option value="nodejs">Node.js</option>
            <option value="mongodb">Mongodb</option>
            <option value="Birds">Birds</option>
            <option value="Nature">Nature</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Fitness">Fitness</option>
            <option value="Technology">Technology</option>
            <option value="Music">Music</option>
            <option value="Movies">Movies</option>
            <option value="Books">Books</option>
            <option value="Fashion">Fashion</option>
            <option value="Sports">Sports</option>
            <option value="Gaming">Gaming</option>
            <option value="Art">Art</option>
            <option value="Photography">Photography</option>
            <option value="Education">Education</option>
            <option value="Science">Science</option>
          </Select>
        </div>

        {/* Add slug input */}
        <TextInput
          type="text"
          placeholder="Slug (URL-friendly title)"
          required
          id="slug"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        />

        {/* Add author input */}
        <TextInput
          type="text"
          placeholder="Author"
          required
          id="author"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            className="text-center text-red-400"
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleImageUpload}
            disabled={imageUploadProgress || imageUploadProgress === 100}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">{imageUploadProgress}% Uploading...</div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && <img src={formData.image} alt="upload" className="w-full h-72 object-cover" />}

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        {/* Publish Button */}
        <Button className="text-center bg-blue-400 text-black" type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>

        {publishError && <Alert className="mt-5" color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
}
