import { createMemoryRouter, RouterProvider, Outlet } from "react-router";
import { render } from "@testing-library/react";

export const renderWithOutletContext = (ui, context = {}) => {
  const routes = [
    {
      path: "/",
      element: <Outlet context={context} />,
      children: [{ index: true, element: ui }],
    },
  ];

  const router = createMemoryRouter(routes, { initialEntries: ["/"] });

  return render(<RouterProvider router={router} />);
};