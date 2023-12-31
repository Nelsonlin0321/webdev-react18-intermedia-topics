import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import usePosts from "../hooks/usePosts";
import { useState } from "react";
import { Button } from "react-bootstrap";
import React from "react";

const PostList = () => {
  const pageSize = 3;
  const [userId, setUserId] = useState<number>();

  const {
    isPending,
    isError,
    error,
    data: posts,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePosts({ userId, pageSize });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="flex flex-col gap-2">
      <Form.Select
        className="mb-3"
        onChange={(event) => setUserId(parseInt(event.target.value))}
        value={userId}
      >
        <option>Select User</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </Form.Select>
      <ListGroup>
        {posts.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <ListGroup.Item key={post.id}>{post.title}</ListGroup.Item>
            ))}
          </React.Fragment>
        ))}
      </ListGroup>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            fetchNextPage();
          }}
          disabled={isFetchingNextPage || !hasNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      </div>
    </div>
  );
};

export default PostList;
