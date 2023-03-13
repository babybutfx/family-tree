import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FamilyCreationPage from "./pages/FamilyCreationPage";
import FamilyTablePage from "./pages/FamilyTablePage";
import FamilyTreePage from "./pages/FamilyTreePage";

const router = createBrowserRouter([
  {
    path: "/family-creation",
    element: <FamilyCreationPage />,
  },
  {
    path: "/family-table",
    element: <FamilyTablePage />,
  },
  {
    path: "/family-tree",
    element: <FamilyTreePage />,
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
