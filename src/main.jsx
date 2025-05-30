import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip";
import Header from "./components/ui/custom/Header";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Viewtrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips";
import { ThemeProvider } from "./components/ui/theme-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header /> {/* Move Header here */}
        <App />
      </>
    ),
  },
  {
    path: "/create-trip",
    element: (
      <>
        <Header /> {/* Include Header for other routes */}
        <CreateTrip />
      </>
    ),
  },
  {
    path: "/view-trip/:tripId",
    element: (
      <>
        <Header /> {/* Include Header for other routes */}
        <Viewtrip />
      </>
    ),
  },
  {
    path: "/my-trips",
    element: (
      <>
        <Header /> {/* Include Header for other routes */}
        <MyTrips />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </StrictMode>
);
