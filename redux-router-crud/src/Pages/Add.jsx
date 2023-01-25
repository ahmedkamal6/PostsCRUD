import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertPost } from "../Redux/postSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
const Add = () => {
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const navigate = useNavigate();
  const postState = useSelector((state) => state.post);
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const post = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      };
      dispatch(insertPost(post))
        .unwrap()
        .then(() => {
          alert("form submitted");
          navigate("/");
        })

        .catch(() => {
          throw new Response("server error", {
            status: 500,
            statusText: "there has been an error with the server",
          });
        });
    },
    [dispatch, navigate]
  );
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Post Title"
          ref={titleRef}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        
        <Form.Control
          as="textarea"
          type="text"
          placeholder="Enter Description"
          ref={descriptionRef}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={postState.loading}>
        {postState.loading?"Posting...":postState.error?"an error has occured refresh the page and try again"  :"Submit"}
      </Button>
    </Form>
  );
};
export default Add;
