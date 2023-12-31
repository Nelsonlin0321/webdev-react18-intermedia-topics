import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../constants";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const useTodos = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryKey: CACHE_KEY_TODOS,
    queryFn: fetchTodos,
  });

  return { todos, error, isLoading };
};

export default useTodos;
