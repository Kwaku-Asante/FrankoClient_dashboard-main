import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './Pages/AdminPage';  // Import the AdminPage component
import Login from './Pages/Login';
import Register from './Pages/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminPage />} />

        {/* Default route redirects */}
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path='/orders' element={<Navigate to="/admin/orders" />} />
        <Route path='/showroom' element={<Navigate to="/admin/showroom" />} />
        <Route path='/categories' element={<Navigate to="/admin/category" />} />
        <Route path='/brand' element={<Navigate to="/admin/brand" />} />
        <Route path='/products' element={<Navigate to="/admin/products" />} />
        <Route path='/users' element={<Navigate to="/admin/users" />} />
        <Route path='/customers' element={<Navigate to="/admin/customers" />} />
      </Routes>
    </Router>
  );
};

export default App;
