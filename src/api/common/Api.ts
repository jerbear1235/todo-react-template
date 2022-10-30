// A common interface wrapper around fetch requests to a server.
// This interface is used to abstract away the implementation of
// api request / responses for all HTTP methods and provide a common
// configuration.  All apis are prefixed with /api.
class Api {
  /**
   * HTTP post method.  The "user" is forwarded as a header
   * in the request.
   * @param api  - Relative path to the api route.  E.g. todos/create will resolve to /api/todos/create
   * @param data - The optional body sent in the post request
   * @returns - json version of the response data if the post succeeds. Throws an Error otherwise.
   */
  public async post<Request, Response>(
    api: string,
    data?: Request
  ): Promise<Response> {
    const response = await fetch(`api/${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user: "test", // TODO: Replace with a proper header for users.
      },
      body: data ? JSON.stringify(data) : null,
    });
    return await response.json();
  }

  /**
   * HTTP get method.  The "user" is forwarded as a header
   * in the request.
   * @param api  - Relative path to the api route.  E.g. todos/create will resolve to /api/todos/create
   * @param params - The optional query params sent in the get request
   * @returns - json version of the response data if the get succeeds. Throws an Error otherwise.
   */
  public async get<Request, Response>(
    api: string,
    params?: Request
  ): Promise<Response> {
    let queryParams = "?";
    if (params) {
      Object.keys(params).forEach(
        (key) => (queryParams += `${key}=${params[key as keyof Request]}&`)
      );
    }
    const response = await fetch(`api/${api}${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        user: "test", // TODO: Replace with a proper header for users.
      },
    });
    return await response.json();
  }

  /**
   * HTTP delete method.  The "user" is forwarded as a header
   * in the request.
   * @param api  - Relative path to the api route.  E.g. todos/create will resolve to /api/todos/create
   * @param data - The optional body sent in the delete request
   * @returns - json version of the response data if the delete succeeds. Throws an Error otherwise.
   */
  public async delete<Request, Response>(
    api: string,
    data?: Request
  ): Promise<Response> {
    const response = await fetch(`api/${api}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        user: "test", // TODO: Replace with a proper header for users.
      },
      body: data ? JSON.stringify(data) : null,
    });
    return await response.json();
  }

  /**
   * HTTP put method.  The "user" is forwarded as a header
   * in the request.
   * @param api  - Relative path to the api route.  E.g. todos/create will resolve to /api/todos/create
   * @param data - The optional body sent in the put request
   * @returns - json version of the response data if the put succeeds. Throws an Error otherwise.
   */
  public async put<Request, Response>(
    api: string,
    data?: Request
  ): Promise<Response> {
    const response = await fetch(`api/${api}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        user: "test", // TODO: Replace with a proper header for users.
      },
      body: data ? JSON.stringify(data) : null,
    });
    return await response.json();
  }

  /**
   * HTTP patch method.  The "user" is forwarded as a header
   * in the request.
   * @param api  - Relative path to the api route.  E.g. todos/create will resolve to /api/todos/create
   * @param data - The optional body sent in the patch request
   * @returns - json version of the response data if the patch succeeds. Throws an Error otherwise.
   */
  public async patch<Request, Response>(
    api: string,
    data?: Request
  ): Promise<Response> {
    const response = await fetch(`api/${api}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        user: "test", // TODO: Replace with a proper header for users.
      },
      body: data ? JSON.stringify(data) : null,
    });
    return await response.json();
  }
}

// The default object you can import if you don't require additional configuration.
export const api = new Api();

// Class object if you need to modify the apis.
export default Api;
