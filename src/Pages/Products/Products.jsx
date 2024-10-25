import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/slice/productSlice';
import { fetchBrands } from '../../Redux/slice/brandSlice';
import { fetchShowrooms } from '../../Redux/slice/showRoomSlice';
import { Button, Table, message, Input } from 'antd';
import AddProduct from './AddProduct';
import UpdateProduct from './EditProduct';

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { brands } = useSelector((state) => state.brands);
  const { showrooms } = useSelector((state) => state.showrooms);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      await dispatch(fetchProducts()).unwrap();
      await dispatch(fetchBrands()).unwrap();
      await dispatch(fetchShowrooms()).unwrap();
    } catch (err) {
      console.error(err);
      message.error('Failed to load data.');
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null); // Reset selected product for adding
    setIsAddModalVisible(true);
  };

  const handleUpdateProduct = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalVisible(true);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Filter products based on search input
  const filteredProducts = products.filter((product) => {
    const productNameMatch = product.productName?.toLowerCase().includes(searchText.toLowerCase()) || false;
    const showroomMatch = product.showRoomName?.toLowerCase().includes(searchText.toLowerCase()) || false;
    const brandMatch = product.brandName?.toLowerCase().includes(searchText.toLowerCase()) || false;
    return productNameMatch || showroomMatch || brandMatch;
  });

  const columns = [
    {
      title: 'Image',
      dataIndex: 'productImage',
      key: 'productImage',
      render: (imagePath) => {
        const backendBaseURL = 'http://197.251.217.45:5000/'; // Replace with your actual backend URL
        const imageUrl = `${backendBaseURL}/Media/Products_Images/${imagePath.split('\\').pop()}`;
        
        return (
          <img
            src={imageUrl}
            alt="Product"
            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '5px' }} // Adjust image display
          />
        );
      },
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => ` ₵${text?.toFixed(2)}`, // Format price
    },
    {
      title: 'Old Price',
      dataIndex: 'oldPrice',
      key: 'oldPrice',
      render: (text) => ` ₵${text?.toFixed(2)}`, // Format price
    },
    
    
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (text) => new Date(text).toLocaleDateString(), // Format date
    },
    {
      title: 'Brand',
      dataIndex: 'brandName',
      key: 'brandName',
    },
    {
      title: 'Showroom',
      dataIndex: 'showRoomName',
      key: 'showRoomName',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button onClick={() => handleUpdateProduct(record)}>Edit</Button>
      ),
    },
  ];

  return (
    <div>
      <Input.Search
        placeholder="Search by product, showroom, or brand name"
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Button type="primary" onClick={handleAddProduct} style={{ marginBottom: 16 }}>Add Product</Button>
      
      <Table dataSource={filteredProducts} columns={columns} rowKey="productID" />

      <AddProduct 
        visible={isAddModalVisible} 
        onClose={() => {
          setIsAddModalVisible(false);
          fetchProductData(); // Refresh the product list after adding
        }} 
        brands={brands}
        showrooms={showrooms}
      />
      <UpdateProduct 
        visible={isUpdateModalVisible} 
        onClose={() => setIsUpdateModalVisible(false)} 
        product={selectedProduct} 
        brands={brands}
        showrooms={showrooms}
      />
    </div>
  );
};

export default Products;
