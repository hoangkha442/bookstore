import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import logo from '../assets/logo.jpg';
import { FaHome, FaList, FaBox, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Menu = () => {
  const { token, setToken, username, setUsername } = useContext(MyContext);
  const location = useLocation();

  const translateToVietnamese = (text) => {
    const translations = {
      'Home': 'Trang chủ',
      'Category': 'Danh mục',
      'Product': 'Sản phẩm',
      'Order': 'Đơn hàng',
      'Customer': 'Khách hàng',
      'Logout': 'Đăng xuất'
    };
    return translations[text] || text;
  };

  const lnkLogoutClick = () => {
    setToken("");
    setUsername("");
  };

  return (
    <div className="p-5 h-screen w-[105px] md:w-72 flex flex-col justify-between">
      <div className="bg-white p-2 rounded-lg flex flex-col flex-1 px-4">
        <div className="flex items-center gap-2 font-bold text-gray-800">
          <div className="w-16 h-13" id="logo">
            <img src={logo} alt="Logo" className="w-full h-full object-cover"/>
          </div>
          <p className="font-bold text-4xl text-gray-800 hidden md:block">MiMan</p>
        </div>  
        <ul className="flex flex-col mt-8 gap-8 flex-1 h-full">
          <li className={`flex items-center gap-4 font-bold p-2 rounded ${location.pathname === "/admin/home" ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"}`}>
            <Link to="/admin/home" className="flex items-center gap-4">
              <FaHome className="text-gray-700"/>
              <span className="hidden md:block hover:text-gray-900">{translateToVietnamese('Home')}</span>
            </Link>
          </li>
          <li className={`flex items-center gap-4 font-bold p-2 rounded ${location.pathname === "/admin/category" ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"}`}>
            <Link to='/admin/category' className="flex items-center gap-4">
              <FaList className="text-gray-700"/>
              <span className="hidden md:block hover:text-gray-900">{translateToVietnamese('Category')}</span>
            </Link>
          </li>
          <li className={`flex items-center gap-4 font-bold p-2 rounded ${location.pathname === "/admin/product" ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"}`}>
            <Link to='/admin/product' className="flex items-center gap-4">
              <FaBox className="text-gray-700"/>
              <span className="hidden md:block hover:text-gray-900">{translateToVietnamese('Product')}</span>
            </Link>
          </li>
          <li className={`flex items-center gap-4 font-bold p-2 rounded ${location.pathname === "/admin/order" ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"}`}>
            <Link to='/admin/order' className="flex items-center gap-4">
              <FaShoppingCart className="text-gray-700"/>
              <span className="hidden md:block hover:text-gray-900">{translateToVietnamese('Order')}</span>
            </Link>
          </li>
          <li className={`flex items-center gap-4 font-bold p-2 rounded ${location.pathname === "/admin/customer" ? "bg-gray-300 text-gray-900" : "text-gray-700 hover:bg-gray-200"}`}>
            <Link to='/admin/customer' className="flex items-center gap-4">
              <FaUser className="text-gray-700"/>
              <span className="hidden md:block hover:text-gray-900">{translateToVietnamese('Customer')}</span>
            </Link>
          </li>
        </ul>
        <div className="mt-auto mb-4">
          <Link to="/admin/home" onClick={lnkLogoutClick} className="flex items-center gap-2 font-bold text-red-500 hover:text-red-700">
            <FaSignOutAlt />
            <span className="hidden md:block">{translateToVietnamese('Logout')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
