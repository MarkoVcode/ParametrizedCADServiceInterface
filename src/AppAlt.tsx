import * as React from "react";
// import ModelList from './components/ModelList';
// import ModelConfig from './components/ModelConfig';
// import ModelLinkProcessor from './components/ModelLinkProcessor';
// import PageNotFound from './components/PageNotFound';
// import Home from './components/Home';
// import UnderTheHood from "./components/UnderTheHood";
import useConfig from "./components/useConfig";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppDecorator from "./components/AppDecorator";
import { lazyLoadRoutes } from "./components/LazyLoadRoutes";

export default function App() {
  const config = useConfig();

  const routes = [
    {
      path: '/',
      element: <AppDecorator />,
      children: [
        {
          path: '/',
          element: lazyLoadRoutes('Home')
        },
        {
          path: '/models',
          element: lazyLoadRoutes('ModelList'),
        },
        {
          path: '/models/:modelId',
          element: lazyLoadRoutes('ModelConfig')
        },
        {
          path: '/models/:modelId/:modelLink',
          element: lazyLoadRoutes('ModelLinkProcessor')
        },
        {
          path: '/underthehood',
          element: lazyLoadRoutes('UnderTheHood')
        },
        {
          path: '*',
          element: lazyLoadRoutes('PageNotFound')
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

