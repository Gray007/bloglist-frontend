import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      {visible ? (
        <button onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      ) : (
        <>
          {props.children}
          <button onClick={toggleVisibility}>Cancel</button>
        </>
      )}
    </div>
  );
});

export default Togglable;