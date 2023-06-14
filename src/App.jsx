import Home from './pages/Home.jsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Results from './pages/Results.jsx';
import UsabilityStudy from './pages/UsabilityStudy.jsx';
import UserManual from './pages/UserManual.jsx';
import ContactUs from './pages/ContactUs.jsx';
import ChestXPert from './pages/ChestXPert.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/home" replace />,
      children: [],
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/results',
      element: <Results />,
    },
    {
      path: '/usability',
      element: <UsabilityStudy />,
    },
    {
      path: '/chestxpert',
      element: <ChestXPert />,
    },
    {
      path: '/user-manual',
      element: <UserManual />,
    },
    {
      path: '/contact-us',
      element: <ContactUs />,
    },
    {
      path: '*',
      element: <Navigate to="/home" replace />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
