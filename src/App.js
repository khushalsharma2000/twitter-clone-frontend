import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import Signin from "./pages/Signin/Signin";
import Navbar from "./components/Navbar/Navbar";
import Error from "./pages/Error/Error";

const Layout = () => {
  return (
    <div className="bg-black text-#A9A9A9 md:w-8/12 mx-auto min-h-screen">
      <Navbar />
      <Outlet></Outlet>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: `${process.env.REACT_APP_PROXY}/`,
        element: <Home />,
      },
      {
        path: `${process.env.REACT_APP_PROXY}/profile/:id`,
        element: <Profile />,
      },
      {
        path: `${process.env.REACT_APP_PROXY}/explore`,
        element: <Explore />,
      },
      {
        path: `${process.env.REACT_APP_PROXY}/signin`,
        element: <Signin />,
      },
      {
        path: `${process.env.REACT_APP_PROXY}/signout`,
        element: <Signin />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

