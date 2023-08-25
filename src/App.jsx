import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: "",
    error: true,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <div>
          <h2>log in to application</h2>
          <Notification notification={notification} />
          <LoginForm setUser={setUser} setNotification={setNotification} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>logout</button>
          <CreateBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setNotification={setNotification}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
