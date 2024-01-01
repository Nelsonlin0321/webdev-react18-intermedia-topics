import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import APIClient from "../services/apiClient";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const apiClient = new APIClient<Todo>("todos");

const useTodos = () => {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryKey: CACHE_KEY_TODOS,
    queryFn: apiClient.getAll,
  });

  return { todos, error, isLoading };
};

export default useTodos;
