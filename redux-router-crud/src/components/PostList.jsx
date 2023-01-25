import React from "react";
import { Table } from "react-bootstrap";
import Post from "./Post";
const PostList = () => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "70%" }}>Title</th>
          <th style={{ width: "10%" }}></th>
        </tr>
      </thead>
        <Post/>
    </Table>
  );
};

export default PostList;
