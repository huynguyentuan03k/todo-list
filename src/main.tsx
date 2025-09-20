import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './routes/root'
import Home from './pages/Home'
import About from './pages/About'
import ErrorPage from './pages/error-page'
import PublishersOverview from './pages/publishers/overview/publisher-overview'
import PublisherShow from './pages/publishers/show/publisher-show'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PublisherCreate from './pages/publishers/create/publisher-show'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/portal/publishers',
        children: [
          {
            index: true, // get /portal/publishers (overview)
            element: <PublishersOverview />
          },
          {
            path: 'create', // get /portal/publishers/create (create)
            element: <PublisherCreate />
          },
          {
            path: ':id', // get /portal/publishers/id (show)
            element: <PublisherShow />
          },
          {
            path: ':id/edit', // put /portal/publishers/3/edit
            element: <PublishersOverview />
          },
          {
            path: ':id/delete', // delete /portal/publishers/4/delete
            element: <PublishersOverview />
          }
        ]
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
