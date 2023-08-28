import { Error404 } from '@/pages/Error404';
import { LandingPage } from '@/pages/LandingPage';
import { SignIn } from '@/pages/SignIn';
import { Route, Routes } from 'react-router-dom';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signIn/:instance" element={<SignIn />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
