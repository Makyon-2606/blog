import React from 'react';
import { Link } from 'react-router-dom';
import './css/style.css';

/**
 * トップ画面
 */
const Top = () => {
  return (
    <>
      <Link to='/signup' className='button sign-up-button'>
        新規登録
      </Link>
      <Link to='/login' className='button login-button'>
        ログイン
      </Link>
    </>
  );
};

export default Top;
