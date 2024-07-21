import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Category from './CategoryComponent';
import Product from './ProductComponent';
import Order from './OrderComponent';
import Customer from './CustomerComponent';
class Main extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    if (this.context.token !== '') {
      return (
        <div className="bg-[#ebebeb]">
          <div className="flex">
          <Menu />
          <div className="flex-1">
            <Routes>
              <Route path='/admin' element={<Navigate replace to='/admin/home' />} />
              <Route path='/admin/home' element={<Home />} />
              <Route path='/admin/category' element={<Category />} />
              <Route path='/admin/product' element={<Product />} />
              <Route path='/admin/order' element={<Order />} />
              <Route path='/admin/customer' element={<Customer />} />
            </Routes>
          </div>
          </div>
        </div>
      );
    }
    return (<div />);
  }
}
export default Main;