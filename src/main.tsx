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
import PodcastsOverview from './pages/podcasts/overview/podcastsOverview';
import PodcastCreate from './pages/podcasts/create/podcastCreate';
import PodcastShow from './pages/podcasts/show/PodcastShow';
import PodcastEdit from './pages/podcasts/edit/podcast-edit';
import AuthorOverview from './pages/authors/overview/CategoryOverview';
import AuthorCreate from './pages/authors/create/AuthorCreate';
import AuthorEdit from './pages/authors/edit/AuthorEdit';
import AuthorShow from './pages/authors/show/AuthorShow';
import EpisodeOverview from './pages/episodes/overview/EpisodeOverview';
import EpisodeCreate from './pages/episodes/create/EpisodeCreate';
import EpisodeEdit from './pages/episodes/edit/EpisodeEdit';
import EpisodeShow from './pages/episodes/show/EpisodeShow';
import Dashboard from './pages/dashboard/Dashboard';
import AboutMe from './pages/aboutMe/AboutMe';
import { Analytics } from '@vercel/analytics/react';
import { AudioProvider } from './components/audio/provider';


const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />

      },
      {
        path: '/epub',
        element: <PageEpub />
      },
      {
        path: '/portal/aboutme',
        children: [
          {
            index: true,
            element: <AboutMe />
          }
        ]
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
            path: ':id/show',
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
            path: ':id/show',
            element: <CategoryShow />
          },
          {
            path: ':id/delete',
          }
        ]
      },
      {
        path: '/portal/authors',
        children: [
          {
            index: true,
            element: <AuthorOverview />
          },
          {
            path: 'create',
            element: <AuthorCreate />
          },
          {
            path: ':id/edit',
            element: <AuthorEdit />
          },
          {
            path: ':id/show',
            element: <AuthorShow />
          },
          {
            path: ':id/delete',
          }
        ]
      },
      {
        path: '/portal/episodes',
        children: [
          {
            index: true,
            element: <EpisodeOverview />
          },
          {
            path: 'create',
            element: <EpisodeCreate />
          },
          {
            path: ':id/edit',
            element: <EpisodeEdit />
          },
          {
            path: ':id/show',
            element: <EpisodeShow />
          },
          {
            path: ':id/delete',
          }
        ]
      },
      {
        path: '/portal/podcasts',
        children: [
          {
            index: true,
            element: <PodcastsOverview />
          },
          {
            path: 'create',
            element: <PodcastCreate />
          },
          {
            path: ':id/edit',
            element: <PodcastEdit />
          },
          {
            path: ':id/show',
            element: <PodcastShow />
          },
          {
            path: ':id/delete',
            element: <PublishersOverview />
          }
        ]
      },
      {
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
      <AudioProvider>
        <RouterProvider router={router} />
        <Toaster />
        <Analytics />
      </AudioProvider>
    </QueryClientProvider>
  </React.StrictMode >
);
