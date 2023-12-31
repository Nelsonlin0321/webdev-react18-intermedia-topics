import { useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import useTodos from "./hooks/useToDos";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { todos, error, isLoading } = useTodos();
  if (isLoading) return <p>{isLoading}</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <Form className=" mb-3">
        <Row>
          <Col>
            <Form.Control type="text" ref={ref} />
          </Col>
          <Col>
            <Button onClick={() => console.log(ref.current?.value)}>Add</Button>
          </Col>
        </Row>
      </Form>
      <ListGroup>
        {todos?.map((todo) => (
          <ListGroup.Item key={todo.id}>{todo.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default TodoForm;
