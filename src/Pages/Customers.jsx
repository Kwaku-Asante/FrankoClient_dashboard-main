import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer } from '../Redux/slice/customerSlice'; // Assuming the slice is in the redux/slices directory
import { Table, Spin, Alert } from 'antd';

const CustomerPage = () => {
  const dispatch = useDispatch();
  const { customers, status, error } = useSelector((state) => state.customer);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCustomer());
    }
  }, [dispatch, status]);

  // Ant Design Table Columns Configuration
  const columns = [
    {
      title: 'Account Number',
      dataIndex: 'customerAccountNumber',
      key: 'customerAccountNumber',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    
    {
      title: 'Account Type',
      dataIndex: 'accountType',
      key: 'accountType',
    },
  ];

  if (status === 'loading') {
    return <Spin size="large" className="spinner" />;
  }

  if (status === 'failed') {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>
      <Table
        columns={columns}
        dataSource={customers}
        rowKey={(record) => record.customerAccountNumber}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CustomerPage;
