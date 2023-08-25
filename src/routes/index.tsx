import HomePage from '@/pages/Home';
import { LandingPage } from '@/pages/LandingPage';
import { SignIn } from '@/pages/SignIn';
import { Route, Routes } from 'react-router-dom';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signIn/:instance" element={<SignIn />} />
      <Route path="/dashboard/:instance" element={<HomePage />} />
    </Routes>
  );
}
