import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import { deletePost } from "../Redux/postSlice";
import { useCallback } from "react";
import { getPost } from "../Redux/postSlice";
import {useNavigate} from 'react-router-dom'
const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const fetchPost = useCallback(
    (id,path="") => {
      dispatch(getPost(id)).then(()=>navigate(`/post/${id}/${path}`));  
    },
    [dispatch,navigate]
  );
  const removePost = useCallback(
    (id) => {
      if (window.confirm("do u want to delete that shit ??"))
        dispatch(deletePost(id));
    },
    [dispatch]
  );
  const posts = useSelector((state) => state.post);
  const allPosts =
    posts.posts &&
    posts.posts.map((post, Index) => {
      return (
        <tr key={post.id}>
          <td>{Index + 1}</td>
          <td onClick={() => fetchPost(post.id)}>{post.title}</td>
          <td>
            <ButtonGroup aria-label="Basic example">
              <Button variant="success" onClick={() => fetchPost(post.id,"edit")} >
                Edit
              </Button>
              <Button onClick={() => removePost(post.id)} variant="danger">
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
  return (
    <>
      <tbody>
        {posts.loading ? (
          <tr>
            <td colSpan={3}>loading posts please wait...</td>
          </tr>
        ) : posts.error ? (
          <tr>
            <td colSpan={3}>{posts.error}</td>
          </tr>
        ) : (
          allPosts
        )}
      </tbody>
    </>
  );
};

export default Post;
