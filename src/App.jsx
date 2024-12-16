import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { Paste } from './Components/Paste';
import { Viewpastes } from './Components/Viewpastes';
import { Home } from './Components/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: '/pastes',
    element: (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: '/pastes/:id',
    element: (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Viewpastes />
      </div>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
