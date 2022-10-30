import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { createTodo } from "../api/todos/TodoApis";

/**
 * A form to create a new todo for the user.
 * The form lists the title and body for the new todo.
 * @returns
 */
const NewTodo: React.FC = () => {
  const queryClient = useQueryClient();
  /**
   * API to update the list of todos.
   * Side Effect:
   * Forces react-query to refetch the list of todos for not_started.
   */
  const postNewTodo = useMutation(
    ["post-todo"],
    () => createTodo({ title: title, body: body }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["my-todos", "not_started"]);
        setTitle("");
        setBody("");
      },
    }
  );
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  return (
    <Form style={{ justifyContent: "left" }}>
      <InputGroup className="mb-3">
        <Form.Control
          disabled={postNewTodo.isLoading}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter the title of your new todo"
        />
        <Button
          onClick={() => postNewTodo.mutate()}
          disabled={title === "" || body === "" || postNewTodo.isLoading}
        >
          {postNewTodo.isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "+"
          )}
        </Button>
      </InputGroup>
      <Form.Control
        disabled={postNewTodo.isLoading}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="mb-2"
        as="textarea"
        placeholder="Enter a description about your todo"
      />
    </Form>
  );
};

export default NewTodo;
