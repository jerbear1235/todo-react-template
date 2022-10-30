import { api } from "../common/Api";
import * as Types from "./TodoApis.types";

// Wrappers around the api class methods to provide an easy way
// to call apis that exist in the client and add types
// to the request / response objects required for the apis.

/**
 * Retrieves a list of todo messages for the signed-in user
 * @param request  - Contains the type of todos to retrieve.
 * @returns - List of todos {title, body}
 */
export const getTodos = async (
  request: Types.GetTodosRequest
): Promise<Types.GetTodosResponse> => {
  const response = await api.get<Types.GetTodosRequest, Types.GetTodosResponse>(
    "getTodos",
    request
  );
  return response;
};

/**
 * Adds a new todo item to the user's list of todos.
 * @param request {body, title}
 * @returns - The created todo item.
 */
export const createTodo = async (
  request: Types.CreateTodoRequest
): Promise<Types.CreateTodoResponse> => {
  const response = await api.post<
    Types.CreateTodoRequest,
    { attributes: Types.CreateTodoResponse }
  >("createTodo", request);
  return response.attributes;
};

/**
 * Given a todo's id, updates the status and information for the todo.
 * @param request - {id, type}
 * @returns - The newly updated todo.
 */
export const updateTodo = async (
  request: Types.UpdateTodoRequest
): Promise<Types.UpdateTodoResponse> => {
  const response = await api.put<
    Types.UpdateTodoRequest,
    { attributes: Types.UpdateTodoResponse }
  >("updateTodo", request);
  return response.attributes;
};

/**
 * Removes a requested todo from the list of the user's todos.
 * @param request - {id}
 * @returns - the deleted todo
 */
export const deleteTodo = async (
  request: Types.DeleteTodoRequest
): Promise<Types.DeleteTodoResponse> => {
  const response = await api.delete<
    Types.DeleteTodoRequest,
    { attributes: Types.DeleteTodoResponse }
  >("deleteTodo", request);
  return response.attributes;
};
