import { useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import useTodos, { Todo } from "./hooks/useToDos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const TodoForm = () => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const { todos, error, isLoading } = useTodos();

  const addTodo = useMutation({
    mutationFn: (todo: Todo) => {
      return axios
        .post<Todo>("https://jsonplaceholder.typicode.com/tosdos", todo)
        .then((res) => res.data);
    },
    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      // Approach 1: Invalidating the cache
      //   queryClient.invalidateQueries({
      //     queryKey: ["todos"],
      //   });
      // Approach 2: Updating the data in the cache
      queryClient.setQueriesData<Todo[]>({ queryKey: ["todos"] }, (todos) => [
        newTodo,
        ...(todos || []),
      ]);

      return previousTodos;
    },
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueriesData<Todo[]>({ queryKey: ["todos"] }, (todos) =>
        todos?.map((todo) => (todo == newTodo ? savedTodo : todo))
      );
      if (ref.current) ref.current.value = "";
    },
    onError: (error, newTodo, previousTodos) => {
      // context: Context is an object that we create to pass data in between our callbacks.
      // Here, need a context object that includes the previous todo before we updated the cache.

      if (!previousTodos) return;
      queryClient.setQueriesData({ queryKey: ["todos"] }, previousTodos);
    },
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
            <Button type="submit" disabled={addTodo.isPending}>
              {addTodo.isPending ? "Add..." : "Add"}
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
