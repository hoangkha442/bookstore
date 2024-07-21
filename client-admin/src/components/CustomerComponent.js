import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Typography } from 'antd';
import GetName from './GetName';

class Customer extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null
    };
  }
  render() {
    const customers = this.state.customers.map((item) => {
      return (
        <tr key={item._id} className=" bg-white border-b border-x transition-all hover:dark:bg-gray-200 hover:dark:border-gray-200 hover:dark:text-white text-center" onClick={() => this.trCustomerClick(item)}>
          <td data-lable='ID' className='break-words text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item._id}</td>
          <td data-lable='UserName' className='text-[16px] px-6 py-3 cursor-pointer text-gray-600'>{item.username}</td>
          {/* <td data-lable='Password' className='px-6 py-3 cursor-pointer text-gray-600'>{item.password}</td> */}
          <td data-lable='Name' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item.name}</td>
          <td data-lable='Phone' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item.phone}</td>
          <td data-lable='Email' className='break-words text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item.email}</td>
          <td data-lable='Active' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item.active}</td>
          <td data-lable='Action' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>
            {item.active === 0 ?
              <button className="link font-bold px-3 py-1 bg-blue-500 transition-all hover:bg-blue-600 w-[30] h-[30] rounded text-gray-600 hover:text-gray-800" onClick={() => this.lnkEmailClick(item)}>EMAIL</button>
              :
              <button className="link font-bold px-3 py-1 bg-red-400 transition-all hover:bg-red-600 w-[30] h-[30] rounded text-gray-800 " onClick={() => this.lnkDeactiveClick(item)}>DEACTIVE</button>}
          </td>
        </tr>
      );
    });
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className=" bg-white border-b border-x transition-all hover:dark:bg-gray-200 hover:dark:border-gray-200 hover:dark:text-white text-center" onClick={() => this.trOrderClick(item)}>
          <td data-lable='ID' className='break-words text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item._id}</td>
          <td data-lable='Ngày' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{new Date(item.cdate).toLocaleString()}</td>
          <td data-lable='Tên' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item.customer.name}</td>
          <td data-lable='SĐT' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item.customer.phone}</td>
          <td data-lable='Tổng tiền' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item.total}</td>
          <td data-lable='Trạng thái' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-900'>{item.status}</td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="text-[16px]  bg-white border-b border-x transition-all hover:dark:bg-gray-200 hover:dark:border-gray-200 hover:dark:text-white text-center">
            <td data-lable='STT' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{index + 1}</td>
            <td data-lable='ID' className='text-[16px] break-words shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item.product._id}</td>
            <td data-lable='Tên' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item.product.name}</td>
            <td data-lable='Hình ảnh' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'><img src={"data:image/jpg;base64," + item.product.image} className='ml-auto w-[50px] h-[70px] object-cover' alt="" /></td>
            <td data-lable='Giá' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item.product.price}</td>
            <td data-lable='Số lượng' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item.quantity}</td>
            <td data-lable='Tổng tiền' className='text-[16px] shadow xl:shadow-none px-6 py-3 cursor-pointer text-gray-600'>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
    return (
      <div className='px-4'>
        <GetName  title='Danh sách khách hàng'/>
        <div className="container-xl mt-10 bg-white p-4">
        <div className="text-center mb-5"><Typography className='text-[20px] font-bold font-montserrat'>Danh sách khách hàng</Typography></div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table" border="1">
          <thead className="text-xs uppercase bg-[#c0903e] text-black">
              <tr className="text-center">
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Tên đăng nhập</th>
                <th scope="col" className="px-6 py-3">tên</th>
                <th scope="col" className="px-6 py-3">SĐT</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Active</th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
          </thead>  
            <tbody>
              
              {customers}
            </tbody>
          </table>
        </div>
        {this.state.orders.length > 0 ?
          <div className="container-70 py-8">
            <div className="text-center mb-5"><Typography className='text-[20px] font-bold font-montserrat'>Danh sách sản phẩm</Typography></div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table" border="1">
                <thead className="text-xs uppercase bg-[#c0903e] text-black">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Ngày</th>
                    <th scope="col" className="px-6 py-3">Tên KH</th>
                    <th scope="col" className="px-6 py-3">SĐT</th>
                    <th scope="col" className="px-6 py-3">Tổng tiền</th>
                    <th scope="col" className="px-6 py-3">Trạng thái</th>
                  </tr>
                </thead> 
                <tbody> 
                {orders}
              </tbody>
            </table>
          </div>
          : <div />}
        {this.state.order ?
          <div className="container-60 py-8">
            <div className="text-center mb-5"><Typography className='text-[20px] font-bold font-montserrat'>Chi tiết đơn hàng</Typography></div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table" border="1">
            <thead className="text-xs uppercase bg-[#c0903e] text-black">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3">STT</th>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Tên SP</th>
                    <th scope="col" className="px-6 py-3">Hình ảnh</th>
                    <th scope="col" className="px-6 py-3">Số lượng</th>
                    <th scope="col" className="px-6 py-3">Tổng tiền</th>
                    <th scope="col" className="px-6 py-3">Total</th>
                  </tr>
                </thead> 
              <tbody>
                {items}
              </tbody>
            </table>
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCustomers();
  }
  // event-handlers
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }
  trOrderClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
   // event-handlers
   lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }
  // apis
  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetCustomers();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
   // event-handlers
   lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }
  // apis
  apiGetCustomerSendmail(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Customer;