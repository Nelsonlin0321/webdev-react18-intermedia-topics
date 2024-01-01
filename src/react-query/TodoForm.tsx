import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import useAddTodo from "./hooks/useAddTodo";
import useTodos from "./hooks/useTodos";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { todos, error, isLoading } = useTodos();

  const addTodo = useAddTodo(() => {
    if (ref.current) ref.current.value = "";
  });

  if (isLoading) return <p>{isLoading}</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      {addTodo.error && <Alert variant="danger">{addTodo.error.message}</Alert>}
      <Form
        className="mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current?.value) {
            addTodo.mutate({
              userId: 1,
              id: 234234,
              title: ref.current.value,
              completed: false,
            });
          }
        }}
      >
        <Row>
          <Col>
            <Form.Control type="text" ref={ref} />
          </Col>
          <Col>
            <Button type="submit">Add</Button>
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
