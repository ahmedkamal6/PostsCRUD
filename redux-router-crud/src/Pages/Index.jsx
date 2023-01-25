import React from "react";
import PostList from "../components/PostList";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../Redux/postSlice";
const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return <PostList />;
};

export default Index;
