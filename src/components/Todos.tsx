import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Stack } from "react-bootstrap";
import { getTodos } from "../api/todos/TodoApis";
import Todo from "./Todo";

interface TodosProps {
  type: "not_started" | "in_progress" | "done";
}

/**
 * Renders a list of todos for a requested type for the user
 * The list is stacked vertically and fetches new todos if the
 * page is completely refetched.
 * @param props - type of todos to load.
 * @returns
 */
const Todos: React.FC<TodosProps> = (props) => {
  /**
   * API to fetch the user's todos for the
   * requested type passed in by properties.
   * The api call is never called again unless
   * the user refreshes the page.
   */
  const todos = useQuery(
    ["my-todos", props.type],
    () => getTodos({ type: props.type }),
    {
      refetchOnMount: false,
      refetchInterval: Infinity,
    }
  );
  if (todos.isLoading) {
    return <div>loading</div>;
  }
  if (todos.isError) return <div>error</div>;
  return (
    <Stack>
      {(todos.data?.items ?? []).map((todo, index) => (
        <Todo key={index.toString()} {...todo} />
      ))}
    </Stack>
  );
};

export default Todos;
