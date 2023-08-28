import { Error404 } from '@/pages/Error404';
import { Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
