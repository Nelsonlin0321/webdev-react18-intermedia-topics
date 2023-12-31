import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: boolean;
};

const usePosts = () => {
  const fetchTodos = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data);

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchTodos,
  });

  return { posts, error, isLoading };
};

export default usePosts;
