import TitleScreen from "./pages/TitleScreen";
import AuthPage from "./pages/AuthPage";
import GamePage from "./pages/GamePage";
import HistoryPage from "./pages/HistoryPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

export const routers = [
    {
      path: "/",
      name: 'home',
      element: <TitleScreen />,
    },
    {
      path: "/auth",
      name: 'auth',
      element: <AuthPage />,
    },
    {
      path: "/game",
      name: 'game',
      element: <GamePage />,
    },
    {
      path: "/history",
      name: 'history',
      element: <HistoryPage />,
    },
    {
      path: "/admin",
      name: 'admin',
      element: <AdminPage />,
    },
    /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
    {
      path: "*",
      name: '404',
      element: <NotFound />,
    },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
