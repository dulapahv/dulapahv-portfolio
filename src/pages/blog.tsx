import React from "react";

const Blog = () => {
  const simulateError = () => {
    throw new Error("Simulated error");
  };
  return (
    <div>
      <div>Blog</div>
      <button onClick={simulateError}>
        A
      </button>
    </div>
  );
};

export default Blog;
