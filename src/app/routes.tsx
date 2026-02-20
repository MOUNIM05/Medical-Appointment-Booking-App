import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { DoctorProfile } from './pages/DoctorProfile';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { Appointments } from './pages/Appointments';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';
import { Messages } from './pages/Messages';
import { Protection } from './pages/Protection';
import { Itinerary } from './pages/Itinerary';
import { AppLayout } from './components/AppLayout';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', Component: Home },
      { path: '/search', Component: Search },
      { path: '/doctor/:id', Component: DoctorProfile },
      { path: '/booking/confirm', Component: BookingConfirmation },
      { path: '/appointments', Component: Appointments },
      { path: '/messages', Component: Messages },
      { path: '/protection', Component: Protection },
      { path: '/itinerary/:id', Component: Itinerary },
      { path: '/profile', Component: Profile },
      { path: '*', Component: NotFound },
    ],
  },
]);
