import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

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

const apiClient = new APIClient<Post>("posts");

const usePosts = (query: PostQuery) => {
  return useInfiniteQuery<Post[]>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam }) => {
      const initParams = {
        _start: ((pageParam as number) - 1) * query.pageSize,
        _limit: query.pageSize,
      };

      const config = {
        params: query.userId
          ? {
              userId: query.userId,
              ...initParams,
            }
          : initParams,
      };

      return apiClient.getAll(config);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default usePosts;
