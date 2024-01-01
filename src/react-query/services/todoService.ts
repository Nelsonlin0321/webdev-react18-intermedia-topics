import APIClient from "./apiClient";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default new APIClient<Todo>("todos");
