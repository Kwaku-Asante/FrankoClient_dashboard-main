import { useLocation, Navigate } from 'react-router-dom';
import AdminLayout from '../Components/Layout/Layout';  // Assuming AdminLayout provides sidebar and layout
import Dashboard from './Dashboard';
import Brands from './Brands';
import Categories from './Categories';
import Products from './Products/Products';
import Orders from './Orders';
import ShowRoom from './ShowRoom';
import Users from './Users';
import Customers from './Customers';

const AdminPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Function to render content based on the current path
  const renderContent = () => {
    switch (currentPath) {
      case '/admin/dashboard':
        return <Dashboard />;
      case '/admin/brands':
        return <Brands />;
      case '/admin/categories':
        return <Categories />;
      case '/admin/products':
        return <Products/>;
      case '/admin/orders':
        return <Orders/>;
      case '/admin/showroom':
        return <ShowRoom/>;
        case '/admin/users':
        return <Users/>;
        case '/admin/customers':
        return <Customers/>;
      case '/admin':
        return <Navigate to="/admin/dashboard" />;
      default:
        return <Navigate to="/admin/dashboard" />;
    }
  };

  return (
    <AdminLayout>
      {/* Admin layout handles the sidebar and overall structure */}
      <div style={{ padding: 16, width: '100%' }}>
        {renderContent()}
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
