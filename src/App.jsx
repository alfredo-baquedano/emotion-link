import NotFound from './pages/NotFoundPage';
import EmotionGraphPage from './pages/EmotionGraphPage';
import ErrorPage from './pages/ErrorPage';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { SnackbarContextProvider } from './contexts/SnackbarContext';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';

const router = createHashRouter([
  {
    path: '/',
    element: <EmotionGraphPage />,
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
