import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/root-layout.tsx'
import { UserProvider } from './contexts/UserContext.tsx'
import LandingPage from './routes/LandingPagex.tsx'
import SignInUpPage from './routes/SignInUpPage.tsx'
import OnboardingPage from './routes/OnboardingPage.tsx'
import SeekerOnbPage from './routes/SeekerOnbPage.tsx'
import DashboardLayout from './layouts/dashboard-layout.tsx'
import DashboardPage from './routes/DashboardPage.tsx'

const router = createBrowserRouter([
  {
    element: (
      <UserProvider>
        <RootLayout />
      </UserProvider>

    ),
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/signin/*', element: <SignInUpPage /> },
      {
        path: '/onboarding', element: (<OnboardingPage />)
      },
      {
        path: '/onboarding/student', element: (<SeekerOnbPage />)
      },
      {
        element: (<DashboardLayout />),
        path: '',
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: '*', element: <div>404</div> },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
