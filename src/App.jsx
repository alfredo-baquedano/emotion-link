import NotFound from './pages/NotFoundPage/NotFoundPage';
import EmotionalGraphPage from './pages/EmotionalGraphPage/EmotionalGraphPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { SnackbarContextProvider } from './contexts/SnackbarContext';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';

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
  return (
    <div className='App'>
      <ThemeContextProvider>
        <SnackbarContextProvider>
          <UserContextProvider>
            <RouterProvider router={router} />
          </UserContextProvider>
        </SnackbarContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
