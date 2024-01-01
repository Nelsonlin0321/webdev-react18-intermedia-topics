import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService from "../services/todoService";

const useTodos = () => {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
  });

  return { todos, error, isLoading };
};

export default useTodos;
