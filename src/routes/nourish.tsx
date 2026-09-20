import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/nourish")({
  component: () => <Outlet />,
});
