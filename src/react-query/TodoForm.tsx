import { useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import useTodos, { Todo } from "./hooks/useToDos";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { todos, error, isLoading } = useTodos();

  const mutation = useMutation({
    mutationFn: (todo: Todo) => {
      return axios
        .post("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data);
    },
  });

  if (isLoading) return <p>{isLoading}</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <Form
        className="mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current?.value) {
            mutation.mutate({
              userId: 1,
              id: 10,
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
            <Button
              type="submit"
              onClick={() => console.log(ref.current?.value)}
            >
              Add
            </Button>
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
