import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Todos from "./components/Todos";
import { Container, Stack } from "react-bootstrap";
import NewTodo from "./components/NewTodo";

// Create a query client
const queryClient = new QueryClient();

/**
 * The main entry point into the application.
 * The app loads the list of todos for the user.
 * @returns
 */
function App(): JSX.Element {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Container fluid>
          <Stack gap={2} className="col-md-5 mx-auto">
            <h1>Static Website Todo List</h1>
            <hr />
            <NewTodo />
            <hr />
            <h3>Not Started</h3>
            <hr />
            <Todos type="not_started" />
            <hr />
            <h3>In Progress</h3>
            <hr />
            <Todos type="in_progress" />
            <hr />
            <h3>Done</h3>
            <hr />
            <Todos type="done" />
            <hr />
          </Stack>
        </Container>
      </QueryClientProvider>
    </div>
  );
}

export default App;
