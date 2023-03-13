import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FamilyCreationPage from "./pages/FamilyCreationPage";
import FamilyTablePage from "./pages/FamilyTablePage";

const router = createBrowserRouter([
  {
    path: "/family-creation",
    element: <FamilyCreationPage />,
  },
  {
    path: "/family-table",
    element: <FamilyTablePage />,
  },
]);

const App = () => {
  return (
    <div>
      <CssBaseline />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
