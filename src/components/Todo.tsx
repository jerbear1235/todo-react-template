import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { deleteTodo, updateTodo } from "../api/todos/TodoApis";

interface TodoProps {
  title: string;
  body: string;
  id: string;
  type: "not_started" | "in_progress" | "done";
}

/**
 * A card that renders the title and body of a TODO item.
 * The card is sorted under the type of todo.
 * @param props
 * @returns
 */
const Todo: React.FC<TodoProps> = (props) => {
  const queryClient = useQueryClient();
  /**
   * API to remove the card from the user's todo list.
   * Side Effect:
   * Forces react-query to refetch the list of todos for the TODO type.
   */
  const deleteTodoApi = useMutation(
    ["delete-todo", props.id],
    () => deleteTodo({ id: props.id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["my-todos", props.type]);
      },
    }
  );
  /**
   * API to update the card's type in the user's todo list.
   * Side Effect:
   * Forces react-query to refetch the list of todos for
   * the new TODO type and the old one.
   */
  const updateTodoApi = useMutation(
    ["update-todo", props.id],
    (newType: "not_started" | "in_progress" | "done") =>
      updateTodo({ id: props.id, type: newType }),
    {
      onSuccess: (response) => {
        // Update the new type.
        queryClient.invalidateQueries(["my-todos", response.type]);
        // Update the old type
        queryClient.invalidateQueries(["my-todos", props.type]);
      },
    }
  );
  return (
    <Card style={{ width: "100%" }}>
      <Card.Header>
        <Card.Title>
          <Row style={{ alignItems: "center" }}>
            <Col md={5} />
            <Col md="auto" style={{ paddingLeft: "60px" }}>
              {props.title}
            </Col>
            <Col />
            <Col md="auto">
              <Button
                onClick={() => deleteTodoApi.mutate()}
                disabled={deleteTodoApi.isLoading}
                style={{ border: "0" }}
                variant="outline-danger"
              >
                {deleteTodoApi.isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "X"
                )}
              </Button>
            </Col>
          </Row>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{props.body}</Card.Subtitle>
        <Card.Footer>
          <Button
            disabled={props.type === "not_started"}
            variant="link"
            onClick={() => updateTodoApi.mutate("not_started")}
          >
            Not Started
          </Button>
          <Button
            disabled={props.type === "in_progress"}
            variant="link"
            onClick={() => updateTodoApi.mutate("in_progress")}
          >
            In Progress
          </Button>
          <Button
            disabled={props.type === "done"}
            variant="link"
            onClick={() => updateTodoApi.mutate("done")}
          >
            Done
          </Button>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Todo;
