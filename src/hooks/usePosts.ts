import { useInfiniteQuery } from "@tanstack/react-query";
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
};

const usePosts = (query: PostQuery) => {
  return useInfiniteQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => {
      const params = {
        _start: ((pageParam as number) - 1) * query.pageSize,
        _limit: query.pageSize,
      };

      return axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: query.userId
            ? {
                userId: query.userId,
                ...params,
              }
            : params,
        })
        .then((res) => res.data);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default usePosts;
