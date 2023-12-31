import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import usePosts from "../hooks/usePosts";

const PostList = () => {
  const { posts, error, isLoading } = usePosts();

  if (isLoading) return <p>{isLoading}</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Form.Select aria-label="Default select example" className="mb-3">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
      <ListGroup>
        {posts?.map((post) => (
          <ListGroup.Item key={post.id}>{post.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default PostList;
