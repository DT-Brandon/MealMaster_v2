import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import { Navigate } from "react-router";
import Profile from "./pages/profile/Profile";
import { userContext } from "./userContext";
import { useContext } from "react";
import Add from "./pages/add/add";
import Recipe from "./pages/recipe/Recipe";
import Search from "./pages/search/Search";
import Contact from "./pages/contact/Contact"
import NotFound from "./pages/notfound/NotFound";
import About from "./pages/about/About";

function App() {
  const { userInfo } = useContext(userContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile",
      element: userInfo ? <Profile /> : <Navigate to="/" />,
    },
    {
      path: "/add",
      element: userInfo ? <Add /> : <Navigate to="/" />,
    },
    {
      path: "/recipe/:recipeId",
      element: <Recipe userInfo={userInfo} />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
