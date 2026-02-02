import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "./Pages/AuthPages/AuthLayout";
import Login from "./Pages/AuthPages/Login/Login";
import Register from "./Pages/AuthPages/Register/Register";
import MainLayout from "./Pages/MainPages/MainLayout";
import Home from "./Pages/MainPages/Home/Home";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./routing/ProtectedRoutes";

function App() {
  const route = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={route} />
      <ToastContainer />
    </>
  );
}

export default App;
