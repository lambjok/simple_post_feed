import React, { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom';

import { AuthContext } from '../context';

import CustomButton from '../components/UI/button/CustomButton';

function Layout() {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }

  return (
    <>
      <nav>
        <CustomButton onClick={logout}>
          Exit
        </CustomButton>
        <ul>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/posts'>Pages</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}

export default Layout