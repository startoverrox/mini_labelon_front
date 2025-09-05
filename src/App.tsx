import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import GlobalToastHandler from "@/components/GlobalToastHandler";
import ProtectedRoute from "@/routes/layouts/PrivateRoute";
import AuthLayout from "@/routes/layouts/AuthLayout";
import DefaultLayout from "@/routes/layouts/DefaultLayout";
import ErrorPage from "@/routes/pages/ErrorPage";
import LoginPage from "@/routes/pages/LoginPage";
import RegisterPage from "@/routes/pages/RegisterPage";
import HomePage from "@/routes/pages/HomePage";
import JobPage from "@/routes/pages/JobPage";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "job/:role",
            element: <JobPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalToastHandler />
      <ToastContainer />
    </>
  );
}

export default App;
