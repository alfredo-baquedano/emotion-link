import { Route, Routes } from 'react-router';
import NotFound from './pages/NotFoundPage/NotFoundPage';
import EmotionalGraphPage from './pages/EmotionalGraphPage/EmotionalGraphPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ToggleColorMode from './ToggleColorMode';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { SnackbarContextProvider } from './contexts/SnackbarContext';

function App() {
  const isDev = import.meta.env.DEV;
  return (
    <ThemeContextProvider>
      <SnackbarContextProvider>
        <div className='App'>
          {isDev && <ToggleColorMode />}
          <Routes>
            <Route
              path='/'
              element={<EmotionalGraphPage />}
            />
            <Route path='/error' element={<ErrorPage />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
      </SnackbarContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
