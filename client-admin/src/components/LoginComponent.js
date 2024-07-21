import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MyContext from '../contexts/MyContext';
import google from '../assets/google.svg';
import booksImage from '../assets/books.jpg';

const Login = () => {
  const [txtUsername, setTxtUsername] = useState('');
  const [txtPassword, setTxtPassword] = useState('');
  const { token, setToken, setUsername } = useContext(MyContext);

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (txtUsername && txtPassword) {
      const account = { username: txtUsername, password: txtPassword };
      apiLogin(account);
    } else {
      alert('Vui lòng nhập tên đăng nhập và mật khẩu');
    }
  };

  const apiLogin = (account) => {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        setToken(result.token);
        setUsername(account.username);
        Swal.fire({
          title: 'Đăng nhập thành công',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        alert(result.message);
      }
    });
  };

  if (token === '') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">Chào mừng Admin</span>
            <span className="font-light text-gray-400 mb-8">
              Chào mừng trở lại! Vui lòng nhập thông tin của bạn
            </span>
            <form onSubmit={handleLoginClick}>
              <div className="py-4">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  value={txtUsername}
                  onChange={(e) => setTxtUsername(e.target.value)}
                  name="email"
                  id="email"
                />
              </div>
              <div className="py-4">
                <span className="mb-2 text-md">Mật khẩu</span>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  value={txtPassword}
                  onChange={(e) => setTxtPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between w-full py-4">
                <div className="mr-24">
                  <input type="checkbox" name="ch" id="ch" className="mr-2" />
                  <span className="text-md">Nhớ trong 30 ngày</span>
                </div>
                <span className="font-bold text-md">Quên mật khẩu</span>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
              >
                Đăng nhập
              </button>
              <button
                type="button"
                className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
              >
                <img src={google} alt="img" className="w-6 h-6 inline mr-2" />
                Đăng nhập bằng Google
              </button>
            </form>
            <div className="text-center text-gray-400">
              Bạn chưa có tài khoản?
              <span className="font-bold text-black">Đăng ký miễn phí</span>
            </div>
          </div>
          <div className="relative">
            <img
              src={booksImage}
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
            <div
              className="absolute hidden bottom-10 left-4 w-[90%] p-6 bg-white bg-opacity-50 backdrop-blur-sm rounded drop-shadow-lg md:block"
            >
              <span className="text-gray-700 text-base">
                Sách hay là hành trang không thể thiếu, đưa bạn đến những miền tri thức mới và những trải nghiệm tuyệt vời.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div />;
};

export default Login;
