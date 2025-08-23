import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorView from './components/common/ErrorView';
import Layout from './layout/Layout';
import DataUploadPage from './pages/DataUploadPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import ChecklistPage from './pages/ChecklistPage';

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorView />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "dashboard",
          element: <DashboardPage />,
        },
        {
          path: "dataupload",
          element: <DataUploadPage />,
        },
        {
          path: "tracking",
          element: <TrackingPage />,
        },
        {
          path: "checklist",
          element: <ChecklistPage />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App
