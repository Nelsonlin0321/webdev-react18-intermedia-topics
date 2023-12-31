import { useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import useTodos, { Todo } from "./hooks/useToDos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const TodoForm = () => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const { todos, error, isLoading } = useTodos();

  const addTodo = useMutation({
    mutationFn: (todo: Todo) => {
      return axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data);
    },
    onSuccess: (savedTodo, _) => {
      // Approach 1: Invalidating the cache
      //   queryClient.invalidateQueries({
      //     queryKey: ["todos"],
      //   });
      // Approach 2: Updating the data in the cache
      queryClient.setQueriesData<Todo[]>({ queryKey: ["todos"] }, (todos) => [
        savedTodo,
        ...(todos || []),
      ]);
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
            addTodo.mutate({
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
