import axios from "axios";
import { Todo } from "./useTodos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  const addTodo = useMutation({
    mutationFn: (todo: Todo) => {
      return axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data);
    },
    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS);
      // Approach 1: Invalidating the cache
      //   queryClient.invalidateQueries({
      //     queryKey: CACHE_KEY_TODOS,
      //   });
      // Approach 2: Updating the data in the cache
      queryClient.setQueriesData<Todo[]>(
        { queryKey: CACHE_KEY_TODOS },
        (todos = []) => [newTodo, ...todos]
      );

      return previousTodos;
    },
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueriesData<Todo[]>(
        { queryKey: CACHE_KEY_TODOS },
        (todos) => todos?.map((todo) => (todo == newTodo ? savedTodo : todo))
      );
      //   if (ref.current) ref.current.value = "";
      onAdd();
    },
    onError: (error, newTodo, previousTodos) => {
      // context: Context is an object that we create to pass data in between our callbacks.
      // Here, need a context object that includes the previous todo before we updated the cache.

      if (!previousTodos) return;
      queryClient.setQueriesData({ queryKey: CACHE_KEY_TODOS }, previousTodos);
    },
  });
  return addTodo;
};

export default useAddTodo;
