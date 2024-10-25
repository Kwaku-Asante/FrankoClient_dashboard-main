import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import { loginUser } from '../Redux/slice/userSlice'; // Adjust the path based on your file structure

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user); // To manage the loading state
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = () => {
    dispatch(loginUser({ contactNumber, password }))
      .unwrap()
      .then(() => {
        message.success('Login successful!');
        navigate('/'); // Redirect to dashboard after login
      })
      .catch((error) => {
        message.error(`Login failed: ${error.message}`);
      });
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Please fill in all required fields!');
    console.error('Failed:', errorInfo);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-40">
      {/* Logo */}
      <div className="text-center mb-6">
        <img src="/path-to-logo/logo.png" alt="Logo" className="mx-auto h-16 w-16" /> {/* Adjust logo path */}
      </div>

      {/* Login Form */}
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="space-y-4"
      >
        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[{ required: true, message: 'Please input your contact number!' }]}
        >
          <Input
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter your contact number"
            className="w-full p-2 border rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-2 border rounded-md"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      {/* Sign Up Link */}
      <div className="text-center mt-4">
        <p>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
