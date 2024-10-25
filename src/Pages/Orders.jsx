import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersByDate } from '../Redux/slice/orderSlice';
import { DatePicker, Button, Table, message, Empty } from 'antd'; // Import Empty from Ant Design

const { RangePicker } = DatePicker;

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [dateRange, setDateRange] = useState([null, null]);

  // Function to fetch orders for the current month
  const fetchCurrentMonthOrders = () => {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    // Format dates to YYYY-MM-DD
    const from = `${startOfMonth.getFullYear()}-${(startOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${startOfMonth.getDate().toString().padStart(2, '0')}`;
    const to = `${endOfMonth.getFullYear()}-${(endOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${endOfMonth.getDate().toString().padStart(2, '0')}`;

    dispatch(fetchOrdersByDate({ from, to }));
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const handleFetchOrders = () => {
    if (dateRange[0] && dateRange[1]) {
      const from = dateRange[0].format('YYYY-MM-DD'); // Format the date to YYYY-MM-DD
      const to = dateRange[1].format('YYYY-MM-DD');
      dispatch(fetchOrdersByDate({ from, to }));
    } else {
      message.error('Please select a date range');
    }
  };

  useEffect(() => {
    // Fetch current month orders on component mount
    fetchCurrentMonthOrders();

    // Check for error messages
    if (error) {
      message.error(`Error: ${error}`);
    }
  }, [dispatch, error]);

  // Define table columns
  const columns = [
    {
      title: 'Order Code',
      dataIndex: 'orderCode', // Adjust based on your order structure
      key: 'orderCode',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName', // Adjust based on your order structure
      key: 'fullName',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber', // Adjust based on your order structure
      key: 'contactNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address', // Adjust based on your order structure
      key: 'address',
    },
      
    {
      title: 'Quantity',
      dataIndex: 'quantity', // Adjust based on your order structure
      key: 'quantity',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate', // Adjust based on your order structure
      key: 'orderDate',
    },
    {
      title:"Status",
      dataIndex: 'orderCycle', // Adjust based on your order structure
      key: 'orderCycle',
    }

  ];

  return (
    <div>
      <h2>Orders</h2>
      <RangePicker
        format="YYYY-MM-DD"
        onChange={handleDateChange}
        style={{ marginBottom: 16 }}
      />
      <Button type="primary" onClick={handleFetchOrders}>
        Fetch Orders
      </Button>
      {loading ? (
        <div>Loading...</div>
      ) : orders.length > 0 ? ( // Check if there are orders
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="orderCode" // Use a unique key for each row
          style={{ marginTop: 16 }}
        />
      ) : (
        <Empty description="No orders found" /> // Show empty state when no orders
      )}
    </div>
  );
};

export default Orders;
