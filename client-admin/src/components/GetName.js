import React, { useContext } from 'react';
import { Avatar, message } from 'antd';
import MyContext from '../contexts/MyContext';

const GetName = ({title}) => {
  const { token, username } = useContext(MyContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
      <p className="text-center text-3xl font-bold mb-4 text-gray-800">
        {title}
      </p>
      <div onClick={() => { message.warning('Tính năng chưa phát triển!') }} className="flex items-center gap-2 cursor-pointer">
        <Avatar style={{ backgroundColor: '#fff' }}>
          <p className='text-gray-900 font-bold'>{username.charAt(0).toUpperCase()}</p>
        </Avatar>
        <p className='font-semibold'>My Profile</p>
      </div>
    </div>
  );
};

export default GetName;
