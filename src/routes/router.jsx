import { createBrowserRouter } from 'react-router-dom';
import WeddingInvitation from '../pages/CoverScreen';
import InvitationScreen from '../pages/InvitationScreen';

export const Router = createBrowserRouter(
  [
    {
      path: '/',
      element: <WeddingInvitation />,
    },
    {
      path: '/invitation',
      element: <InvitationScreen />,
    },
  ],
  {
    scrollRestoration: 'manual',
  }
);