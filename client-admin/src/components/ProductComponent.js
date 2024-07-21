import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';
import { Typography } from 'antd';
import './product.css'
import GetName from './GetName';

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr  className="bg-white border-b border-x transition-all hover:dark:bg-orange-200 hover:dark:border-orange-200 hover:dark:text-white text-center" key={item._id} onClick={() => this.trItemClick(item)}>
          <td data-lable='Sản phẩm' className='text-start flex items-center text-sm md:text-[16px] px-6 py-3 cursor-pointer text-gray-600 shadow lg:shadow-none'>
            <img 
              src={"data:image/jpg;base64," + item.image}
              alt="image"
              className="w-20 h-20 object-cover inline-block" 
            />
            <h2 className="ml-4 inline-block font-normal text-sm truncate">{item.name}</h2>
          </td>
          <td data-lable='Giá' className='text-sm md:text-[16px] px-6 py-3 cursor-pointer text-gray-600 shadow lg:shadow-none'>{item.price.toLocaleString()} ₫</td>
          <td data-lable='Ngày tạo' className='text-sm md:text-[16px] px-6 py-3 cursor-pointer text-gray-600 shadow lg:shadow-none'><td className="border px-4 py-2">{new Date(item.cdate).toLocaleDateString()}</td></td>
          <td data-lable='Danh mục' className='text-sm md:text-[16px] px-6 py-3 cursor-pointer text-gray-600 shadow lg:shadow-none'>{item.category.name}</td>

        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<button className='mr-2 w-[30px] h-[30px] rounded-full bg-[#c1903f] text-black'><span  key={index}> <b >{index + 1}</b>  </span></button>);
      } else {
        return (<button className='mx-2 transition-all w-[30px] h-[30px] rounded-full hover:bg-[#c1903f] hover:text-black hover:font-bold'>
          <span key={index} onClick={() => this.lnkPageClick(index + 1)}> {index + 1} </span>
        </button>);
      }
    });
    return (
      <div className='px-4'>
        <GetName title='Danh sách sản phẩm'/>
        <div className="container-xl py-10 flex-row xl:justify-between xl:flex">

        
        <div className="bg-white rounded-lg p-2">
        <div className="text-center mb-5"><Typography className='text-[20px] font-bold font-montserrat'>Danh sách sản phẩm</Typography></div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table" border="1">
            <thead className="text-xs uppercase bg-[#c1903f] text-black">
                <tr className='text-center'>
                  <th scope="col" className="px-6 py-3">Sản phẩm</th>
                  <th scope="col" className="px-6 py-3">Giá</th>
                  <th scope="col" className="px-6 py-3">Ngày tạo</th>
                  <th scope="col" className="px-6 py-3">Danh mục</th>
                </tr>
              </thead>
            <tbody id='tbodyCustumer'>
              {prods}
              {/* <tr className='flex justify-center items-center' >   
              </tr> */}
            </tbody>
          </table>
          <Typography className='active-bar text-center p-0 lg:pt-3'>{pagination}</Typography>
        </div>
        <div className="">
          <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts}/>
        </div>
        </div>
        <div/>
      </div>
    );
  }
  updateProducts = (products, noPages) => { // arrow-function
    this.setState({ products: products, noPages: noPages });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;