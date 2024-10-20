import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { OnboardingPage } from "./pages/Onboarding.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OnboardingPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
