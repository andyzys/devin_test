import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@arco-design/web-react/dist/css/arco.css';
import EcommerceDetailPage from './pages/ecommerce_detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ecommerce-detail/:productId" element={<EcommerceDetailPage />} />
        <Route path="*" element={<Navigate to="/ecommerce-detail/prod_001" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
