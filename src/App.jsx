import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: "",
    error: true,
  });

  const blogFormRef = useRef();

  console.log('blogs', blogs)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
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
          <Togglable buttonLabel="Log in here">
            <LoginForm setUser={setUser} setNotification={setNotification} />
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>Logout</button>
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <CreateBlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setNotification={setNotification}
              user={user}
              blogFormRef={blogFormRef}
            />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              setBlogs={setBlogs}
              setNotification={setNotification}
              userid={user.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
