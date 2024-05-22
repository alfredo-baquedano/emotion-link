import { Route, Routes } from 'react-router';
import NotFound from './pages/NotFoundPage/NotFoundPage';
import EmotionalGraphPage from './pages/EmotionalGraphPage/EmotionalGraphPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ToggleColorMode from './ToggleColorMode';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { SnackbarContextProvider } from './contexts/SnackbarContext';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/',
    element: <EmotionalGraphPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  const isDev = import.meta.env.DEV;
  return (
    <ThemeContextProvider>
      <SnackbarContextProvider>
        <div className='App'>
          {isDev && <ToggleColorMode />}
          <RouterProvider router={router} />
        </div>
      </SnackbarContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
