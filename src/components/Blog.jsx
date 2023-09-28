import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs, setNotification, userid }) => {
  const [showBlog, setShowBlog] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes || 0)

  const blogStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  }

  console.log(blog.likedBy)

  const handleDelete = async () => {
    setButtonDisable(true)
    if (
      window.confirm(
        `Are you sure you want to delete the blog - ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs((prevBlogs) => {
          return prevBlogs.filter((x) => x.id !== blog.id)
        })
        setNotification({ message: "Blog deleted successfully", error: false })
        setTimeout(() => {
          setNotification({ message: "" })
        }, 5000)
      } catch (exception) {
        setNotification({ message: "Blog not deleted", error: true })
        setTimeout(() => {
          setNotification({ message: "" })
        }, 5000)
      }
    }
    setButtonDisable(false)
  }

  const handleLike = async () => {
    setButtonDisable(true)
    try {
      await blogService.updateLike(blog.id)
      setBlogs((prevBlogs) => {
        return prevBlogs.map((prevBlog) => {
          if (prevBlog.id === blog.id) {
            const isLiked = prevBlog.likedBy.includes(userid)
            setBlogLikes((prevLikes) =>
              isLiked ? prevLikes - 1 : prevLikes + 1
            )
            return {
              ...prevBlog,
              likedBy: isLiked
                ? prevBlog.likedBy.filter((id) => id !== userid)
                : [...prevBlog.likedBy, userid],
            }
          } else {
            return prevBlog
          }
        })
      })
    } catch (exception) {
      setNotification({ message: "Like not updated", error: true })
      setTimeout(() => {
        setNotification({ message: "" })
      }, 5000)
    }
    setButtonDisable(false)

    //   const newBlog = await blogService.update(blog.id, blogObject);
    //   setBlogs(blogs.concat({ ...newBlog, user: { name: username } }));
    //   setNotification({
    //     message: `a new blog: ${newTitle} by ${newAuthor} has been added.`,
    //     error: false,
    //   });
    //   setTimeout(() => {
    //     setNotification({ message: "" });
    //   }, 5000);
    //   setNewTitle("");
    //   setNewAuthor("");
    //   setNewURL("");
    // } catch (exception) {
    //   setNotification({ message: "Blog not added", error: true });
    //   setTimeout(() => {
    //     setNotification({ message: "" });
    //   }, 5000);
    // }
    // blogFormRef.current.toggleVisibility();
  }

  return (
    <div style={blogStyle}>
      <p>
        {`${blog.title} ${blog.author} `}
        <button onClick={() => setShowBlog(!showBlog)}>
          {showBlog ? "Hide" : "View"}
        </button>
      </p>
      {showBlog && (
        <div>
          <p>{blog.url}</p>
          <p>
            {`likes: ${blogLikes} `}
            <button disabled={buttonDisable} onClick={() => handleLike()}>
              {blog.likedBy.indexOf(userid) !== -1 ? "Unlike" : "Like"}
            </button>
          </p>
          <p>{blog.user.name}</p>
          {blog.user.id === userid && (
            <button disabled={buttonDisable} onClick={() => handleDelete()}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
