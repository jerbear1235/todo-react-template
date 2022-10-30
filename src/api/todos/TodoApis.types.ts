export type Todo = {
  body: string;
  title: string;
  id: string;
  type: "not_started" | "in_progress" | "done";
};

export type HttpResponse = {
  statusCode: number;
  isBase64Encoded: boolean;
};

export type GetTodosRequest = { type: "not_started" | "in_progress" | "done" };
export type GetTodosResponse = { items: Todo[] };
export type UpdateTodoRequest = {
  id: string;
  type: "not_started" | "in_progress" | "done";
};
export type UpdateTodoResponse = {
  id: string;
  type: "not_started" | "in_progress" | "done";
};
export type CreateTodoRequest = {
  body: string;
  title: string;
};
export type CreateTodoResponse = { attributes: Todo };
export type DeleteTodoRequest = { id: string };
export type DeleteTodoResponse = { attributes: Todo };
