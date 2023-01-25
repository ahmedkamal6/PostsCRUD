import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { editPost } from "../Redux/postSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Form } from "react-bootstrap";
const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = useRef();
  const description = useRef();
  const updatePost = useCallback(
    (id) => {
      dispatch(
        editPost({
          id,
          title: title.current.value,
          description: description.current.value,
        })
      ).then(() => {
        navigate("/");
      });
    },
    [dispatch, navigate]
  );
  const { post } = useSelector((state) => state.post);
  return (
    <div className="d-flex flex-column">
      <label htmlFor="title">Title</label>
      <Form.Control
        ref={title}
        name="title"
        defaultValue={post.title}
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
     
      <label htmlFor="description" className="d-flex mt-4"></label>
      Description
      <Form.Control
        ref={description}
        name="title"
        as="textarea"
        defaultValue={post.description}
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
      <Button className="mt-3" onClick={() => updatePost(post.id)}>
        Update
      </Button>
    </div>
  );
};

export default Edit;
