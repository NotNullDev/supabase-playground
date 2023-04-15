import { createBrowserRouter } from "react-router-dom";
import { IndexPage } from "./pages/index";
import { UserPage } from "./pages/user";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
]);
