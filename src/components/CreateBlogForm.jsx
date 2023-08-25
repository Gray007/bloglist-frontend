import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlogForm = ({ blogs, setBlogs, setNotification }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newURL, setNewURL] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newURL,
      };

      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      setNotification({
        message: `a new blog: ${newTitle} by ${newAuthor} has been added.`,
        error: false,
      });
      setTimeout(() => {
        setNotification({ message: "" });
      }, 5000);
      setNewTitle("");
      setNewAuthor("");
      setNewURL("");
    } catch (exception) {
      setNotification({ message: "Blog not added", error: true });
      setTimeout(() => {
        setNotification({ message: "" });
      }, 5000);
    }
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={newTitle}
          name="title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newURL}
          name="url"
          onChange={({ target }) => setNewURL(target.value)}
        />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default CreateBlogForm;
