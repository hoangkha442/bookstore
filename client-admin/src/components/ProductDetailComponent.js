import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../contexts/MyContext';
import { Typography, message } from 'antd';

const ProductDetail = ({ item, curPage, updateProducts }) => {
  const { token } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [txtID, setTxtID] = useState('');
  const [txtName, setTxtName] = useState('');
  const [txtPrice, setTxtPrice] = useState(0);
  const [cmbCategory, setCmbCategory] = useState('');
  const [imgProduct, setImgProduct] = useState('');
  const [isImage, setIsImage] = useState(true);

  useEffect(() => {
    apiGetCategories();
  }, []);

  useEffect(() => {
    if (item) {
      setTxtID(item._id);
      setTxtName(item.name);
      setTxtPrice(item.price);
      setCmbCategory(item.category._id);
      setImgProduct('data:image/jpg;base64,' + item.image);
    }
  }, [item]);

  const previewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(fileType)) {
        setIsImage(false);
        message.error('Chỉ cho phép các file ảnh (jpg, png, gif).');
        return;
      }
      setIsImage(true);
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImgProduct(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearForm = () => {
    setTxtID('');
    setTxtName('');
    setTxtPrice(0);
    setCmbCategory('');
    setImgProduct('');
  };

  const btnAddClick = (e) => {
    e.preventDefault();
    if (!isImage) {
      message.error('Chỉ cho phép các file ảnh.');
      return;
    }
    if (txtName && txtPrice && cmbCategory && imgProduct) {
      const prod = {
        name: txtName,
        price: parseInt(txtPrice),
        category: cmbCategory,
        image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, '')
      };
      apiPostProduct(prod);
    } else {
      message.error('Vui lòng nhập tên, giá, danh mục, và hình ảnh');
    }
  };

  const apiPostProduct = (prod) => {
    const config = { headers: { 'x-access-token': token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        message.success('Thêm sản phẩm thành công!');
        apiGetProducts();
        clearForm();
      } else {
        message.error('Thêm sản phẩm thất bại');
      }
    });
  };

  const apiGetProducts = () => {
    const config = { headers: { 'x-access-token': token } };
    axios.get('/api/admin/products?page=' + curPage, config).then((res) => {
      const result = res.data;
      updateProducts(result.products, result.noPages, result.curPage);
      if (result.products.length !== 0) {
        updateProducts(result.products, result.noPages, result.curPage);
      } else {
        const newPage = curPage - 1;
        axios.get('/api/admin/products?page=' + newPage, config).then((res) => {
          const result = res.data;
          updateProducts(result.products, result.noPages, newPage);
        });
      }
    });
  };

  const btnUpdateClick = (e) => {
    e.preventDefault();
    if (!isImage) {
      message.error('Chỉ cho phép các file ảnh.');
      return;
    }
    if (txtID && txtName && txtPrice && cmbCategory && imgProduct) {
      const prod = {
        name: txtName,
        price: parseInt(txtPrice),
        category: cmbCategory,
        image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, '')
      };
      apiPutProduct(txtID, prod);
    } else {
      message.error('Vui lòng nhập ID, tên, giá, danh mục, và hình ảnh');
    }
  };

  const apiPutProduct = (id, prod) => {
    const config = { headers: { 'x-access-token': token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        message.success('Cập nhật sản phẩm thành công!');
        apiGetProducts();
        clearForm();
      } else {
        message.error('Cập nhật sản phẩm thất bại');
      }
    });
  };

  const btnDeleteClick = (e) => {
    e.preventDefault();
    if (window.confirm('Bạn có chắc chắn không?')) {
      if (txtID) {
        apiDeleteProduct(txtID);
      } else {
        message.error('Vui lòng nhập ID');
      }
    }
  };

  const apiDeleteProduct = (id) => {
    const config = { headers: { 'x-access-token': token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        message.success('Xóa sản phẩm thành công!');
        apiGetProducts();
        clearForm();
      } else {
        message.error('Xóa sản phẩm thất bại');
      }
    });
  };

  const cates = categories.map((cate) => (
    <option key={cate._id} value={cate._id} selected={item && cate._id === item.category._id}>{cate.name}</option>
  ));

  const apiGetCategories = () => {
    const config = { headers: { 'x-access-token': token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      setCategories(result);
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-4">Chi tiết sản phẩm</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">ID</label>
          <input
            type="text"
            value={txtID}
            onChange={(e) => setTxtID(e.target.value)}
            readOnly
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tên sản phẩm</label>
          <input
            type="text"
            value={txtName}
            onChange={(e) => setTxtName(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Giá</label>
          <input
            type="text"
            value={txtPrice}
            onChange={(e) => setTxtPrice(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hình ảnh</label>
          <input
            type="file"
            name="fileImage"
            accept="image/jpeg, image/png, image/gif"
            onChange={previewImage}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Danh mục</label>
          <select
            onChange={(e) => setCmbCategory(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
          >
            {cates}
          </select>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            onClick={btnAddClick}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mt-2"
          >
            Thêm
          </button>
          <button
            type="submit"
            onClick={btnUpdateClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-2"
          >
            Sửa
          </button>
          <button
            type="submit"
            onClick={btnDeleteClick}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mt-2"
          >
            Xóa
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mt-2"
          >
            Xóa
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
