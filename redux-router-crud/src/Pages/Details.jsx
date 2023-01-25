import React from "react";
import { useSelector } from "react-redux";

const Details = () => {
  const { post } = useSelector((state) => state.post);
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </>
  );
};

export default Details;
