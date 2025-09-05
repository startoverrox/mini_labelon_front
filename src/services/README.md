# Services

This directory contains the services for the application.  
Services are used to interact with the backend API.

## Declaration

declare the function to interact with the backend API.

### Warning

use `handleApiResponse` to handle the response from the backend API.

`handleApiResponse` sets toast and returns `ApiResponse<T>` type.

Toast is shown in the bottom right of the screen for 1 second.  
if `result.message` is undefined or empty string, toast is not shown.

`ApiResponse<T>` type is as follows.

```ts
export interface ApiResponse<T = unknown> {
  success?: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}
```

### Example

```ts
export const someApi = async (
  // request parameter type
  paramA: string,
  paramB: number,
): Promise<
  ApiResponse<{
    // T (type of "data" field) of ApiResponse
    dataA: string;
    dataB: number;
    dataC: boolean;
  }>
> => {
  // call the backend API
  const result = await handleApiResponse(
    api.post("/some/api/", { paramA, paramB }),
  );

  if (result.success && result.data) {
    // store the result to the zustand store
    const { dataA, dataB, dataC } = result.data;
    const store = useSomeStore.getState();
    store.setSomeData({ dataA, dataB, dataC });
  }

  // return the result
  return result;
};
```

## Usage

call the function and show toast.

Toast is shown in the bottom right of the screen for 1 second.  
if result.message is undefined or empty string, toast is not shown.

```ts
const result = await someApi("test", 123);
```
