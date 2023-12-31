import ListGroup from "react-bootstrap/ListGroup";
import useTodos from "./hooks/useToDos";

const ToDoList = () => {
  const { todos, error, isLoading } = useTodos();

  if (isLoading) return <p>{isLoading}</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <ListGroup>
      {todos?.map((todo) => (
        <ListGroup.Item key={todo.id}>{todo.title}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ToDoList;
