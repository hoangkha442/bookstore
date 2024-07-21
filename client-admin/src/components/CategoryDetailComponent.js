import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../contexts/MyContext';
import Swal from 'sweetalert2';

const CategoryDetail = ({ item, updateCategories }) => {
  const { token } = useContext(MyContext);
  const [txtID, setTxtID] = useState('');
  const [txtName, setTxtName] = useState('');

  useEffect(() => {
    if (item) {
      setTxtID(item._id);
      setTxtName(item.name);
    }
  }, [item]);

  const clearInputs = () => {
    setTxtID('');
    setTxtName('');
  };

  const btnAddClick = (e) => {
    e.preventDefault();
    if (txtName) {
      const cate = { name: txtName };
      apiPostCategory(cate);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập tên!',
      });
    }
  };

  const apiPostCategory = (cate) => {
    const config = { headers: { 'x-access-token': token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Đã thêm danh mục!',
        });
        apiGetCategories();
        clearInputs();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Thêm danh mục thất bại!',
        });
      }
    });
  };

  const apiGetCategories = () => {
    const config = { headers: { 'x-access-token': token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      updateCategories(result);
    });
  };

  const btnUpdateClick = (e) => {
    e.preventDefault();
    if (txtID && txtName) {
      const cate = { name: txtName };
      apiPutCategory(txtID, cate);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng nhập ID và tên!',
      });
    }
  };

  const apiPutCategory = (id, cate) => {
    const config = { headers: { 'x-access-token': token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Đã cập nhật danh mục!',
        });
        apiGetCategories();
        clearInputs();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Cập nhật danh mục thất bại!',
        });
      }
    });
  };

  const btnDeleteClick = (e) => {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      if (txtID) {
        apiDeleteCategory(txtID);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Vui lòng nhập ID!',
        });
      }
    }
  };

  const apiDeleteCategory = (id) => {
    const config = { headers: { 'x-access-token': token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Đã xóa danh mục!',
        });
        apiGetCategories();
        clearInputs();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Xóa danh mục thất bại!',
        });
      }
    });
  };

  return (
    <div className="p-4 rounded-lg bg-white">
      <h2 className="text-center text-2xl font-bold mb-4">Chi tiết</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">ID</label>
          <input 
            disabled 
            type="text" 
            value={txtID} 
            onChange={(e) => setTxtID(e.target.value)} 
            readOnly={true} 
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input 
            type="text" 
            value={txtName} 
            onChange={(e) => setTxtName(e.target.value)} 
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
          />
        </div>
        <div className="flex flex-wrap">
          <button 
            type="submit" 
            onClick={btnAddClick} 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mt-2 mr-2"
          >
            Thêm
          </button>
          <button 
            type="submit" 
            onClick={btnUpdateClick} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-2 mr-2"
          >
            Sửa
          </button>
          <button 
            type="submit" 
            onClick={btnDeleteClick} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mt-2 mr-2"
          >
            Xóa
          </button>
          <button 
            type="button" 
            onClick={clearInputs} 
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mt-2 mr-2"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryDetail;
