import * as React from "react";
import ModelList from './components/ModelList';
import ModelConfig from './components/ModelConfig';
import ModelLinkProcessor from './components/ModelLinkProcessor';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import useConfig from "./components/useConfig";
import UnderTheHood from "./components/UnderTheHood";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppDecorator from "./components/AppDecorator";

export default function App() {
  const config = useConfig();

  const routes = [
    {
      path: '/',
      element: <AppDecorator />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/models',
          element: <ModelList />
        },
        {
          path: '/models/:modelId',
          element: <ModelConfig />
        },
        {
          path: '/models/:modelId/:modelLink',
          element: <ModelLinkProcessor />
        },
        {
          path: '/underthehood',
          element: <UnderTheHood />
        },
        {
          path: '*',
          element: <PageNotFound />
        }
      ]
    }
  ];

  const router = createBrowserRouter(routes, {
    basename: config.app.ROUTER_PATH_BASENAME
  });

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

