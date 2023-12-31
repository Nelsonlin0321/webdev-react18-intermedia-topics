import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: boolean;
};

type PostQuery = {
  userId: number | undefined;
  pageSize: number;
  page: number;
};

const usePosts = (query: PostQuery) => {
  const params = {
    _start: (query.page - 1) * query.pageSize,
    _limit: query.pageSize,
  };

  const fetchTodos = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: query.userId ? { userId: query.userId, ...params } : params,
      })
      .then((res) => res.data);

  return useQuery({
    queryKey: ["posts", query],
    queryFn: fetchTodos,
    staleTime: 1 * 60 * 1000, //1 mins
    placeholderData: (previousData) => previousData,
  });
};

export default usePosts;
