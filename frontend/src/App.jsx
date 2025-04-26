import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { AuthProvider } from "./context/authContext";
import Protection from "./Protection";
import RootLayout from "./pages/RootLayout";
import Profile from "./pages/Profile";
import { TweetProvider } from "./context/tweetContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <Protection>
            <Home />
          </Protection>
        ),
      },
      {
        path: "/profile",
        element: (
          <Protection>
            <Profile />
          </Protection>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <TweetProvider>
        <RouterProvider router={router} />
      </TweetProvider>
    </AuthProvider>
  );
}

export default App;
