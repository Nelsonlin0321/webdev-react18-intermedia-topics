import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import usePosts from "../hooks/usePosts";
import { useState } from "react";
import { Button } from "react-bootstrap";

const PostList = () => {
  const pageSize = 10;
  const [userId, setUserId] = useState<number>();
  const [page, setPage] = useState<number>(1);

  const {
    isPending,
    isError,
    error,
    data: posts,
  } = usePosts({ userId, pageSize, page });

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
        {posts?.map((post) => (
          <ListGroup.Item key={post.id}>{post.title}</ListGroup.Item>
        ))}
      </ListGroup>
      <div className="flex gap-2">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={posts.length == 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PostList;
