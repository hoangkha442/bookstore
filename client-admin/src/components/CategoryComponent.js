import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
import { Avatar, message } from 'antd';
import { Link } from 'react-router-dom';

const Category = () => {
  const { token, username } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);

  useEffect(() => {
    apiGetCategories();
  }, []);

  const trItemClick = (item) => {
    setItemSelected(item);
  };

  const apiGetCategories = () => {
    const config = { headers: { 'x-access-token': token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      setCategories(result);
    });
  };

  const updateCategories = (categories) => {
    setCategories(categories);
  };

  const cates = categories.map((item) => (
    <tr 
      key={item._id} 
      className={`cursor-pointer hover:bg-gray-200 ${itemSelected && itemSelected._id === item._id ? 'bg-gray-300' : ''}`} 
      onClick={() => trItemClick(item)}
    >
      <td className="border px-4 py-2">{item._id}</td>
      <td className="border px-4 py-2">{item.name}</td>
    </tr>
  ));

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <p className="text-center text-3xl font-bold mb-4 text-gray-800">
          Danh mục sản phẩm
        </p>
        <div onClick={() => { message.warning('Tính năng chưa phát triển!') }} className="flex items-center gap-2 cursor-pointer">
          <Avatar style={{ backgroundColor: '#fff' }}>
            <p className='text-gray-900 font-bold'>{username.charAt(0).toUpperCase()}</p>
          </Avatar>
          <p className='font-semibold'>My Profile</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 overflow-auto h-60">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Name</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cates}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-lg p-4">
          <CategoryDetail item={itemSelected} updateCategories={updateCategories} />
        </div>
      </div>
    </div>
  );
};

export default Category;
