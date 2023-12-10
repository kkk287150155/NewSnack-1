import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SplashPage from "./SplashPage";
import SignIn from "./SignInPage";
import SignUp from "./SignUpPage";
import InitialSetup from "./InitialSetup";
import FeedPage from "./FeedPage";
import Redirection from "./SignUpPage/KakaoLogin/Redirection";
import InterestSetup from "./InterestSetup";

const theme = createTheme({
  typography: {
    fontFamily: ["Pretendard", "Roboto"].join(","),
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashPage />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "initialsetup",
    element: <InitialSetup />,
  },
  {
    path: "interestsetup",
    element: <InterestSetup />,
  },
  {
    path: "feed",
    element: <FeedPage />,
  },
  {
    path: "api/kuser/kakao/callback",
    element: <Redirection />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
