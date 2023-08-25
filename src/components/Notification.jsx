const Notification = ({ notification }) => {
  if (notification.message === '') {
    return null;
  }

  return (
    <div
      style={{
        color: notification.error ? "red" : "green",
        fontWeight: "bold",
        backgroundColor: notification.error ? "#FFD2D2" : "#D2FFD2",
      }}
    >
      {notification.message}
    </div>
  );
};

export default Notification;