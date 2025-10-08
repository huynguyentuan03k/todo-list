import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import 'regenerator-runtime/runtime';
import './index.css'
import Root from './routes/root'
import ErrorPage from './pages/error-page'
import PublishersOverview from './pages/publishers/overview/publisherOverview'
import PublisherShow from './pages/publishers/show/PublisherShow'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PublisherCreate from './pages/publishers/create/publisherCreate'
import PublisherEdit from './pages/publishers/edit/publisher-edit'
import PageEpub from './pages/components/custom/PageEpub'
import { Toaster } from "@/components/ui/toaster"
import CategoryOverview from './pages/categories/overview/CategoryOverview';
import CategoryShow from './pages/categories/show/CategoryShow';
import CategoryCreate from './pages/categories/create/CategoryCreate';
import CategoryEdit from './pages/categories/edit/CategoryEdit';
import SettingsPage from './pages/settings/SettingsPage';
import KeywordSuggestions from './pages/settings/keyword-suggestions';
import SeasonalThemes from './pages/settings/Seasonal-Themes';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/epub',
        element: <PageEpub />
      },
      {
        path: '/portal/publishers',
        children: [
          {
            index: true,
            element: <PublishersOverview />
          },
          {
            path: 'create',
            element: <PublisherCreate />
          },
          {
            path: ':id/edit',
            element: <PublisherEdit />
          },
          {
            path: ':id',
            element: <PublisherShow />
          },
          {
            path: ':id/delete',
            element: <PublishersOverview />
          }
        ]
      },
      {
        path: '/portal/categories',
        children: [
          {
            index: true,
            element: <CategoryOverview />
          },
          {
            path: 'create',
            element: <CategoryCreate />
          },
          {
            path: ':id/edit',
            element: <CategoryEdit />
          },
          {
            path: ':id',
            element: <CategoryShow />
          },
          {
            path: ':id/delete',
          }
        ]
      },
      {
        // /portal/settings/keywordsuggestions
        path: '/portal/settings',
        element: <SettingsPage />,
        children: [
          {
            index: true,
            element: <Navigate to="SeasonalThemes" replace />,
          },
          {
            path: 'keywordSuggestions',
            element: <KeywordSuggestions />
          },
          {
            path: 'SeasonalThemes',
            element: <SeasonalThemes />
          },
        ]
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
