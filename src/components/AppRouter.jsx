import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router';

import { AuthContext } from '../context';

import Layout from '../pages/Layout';

import Loader from './UI/loader/CustomLoader';

function AppRouter() {
  const {isAuth, isLoading} = useContext(AuthContext);
  console.log(isAuth);

  if (isLoading) {
    return <Loader />
  }
  return (
    isAuth 
      ? <Routes> 
          <Route path='/' element={<Layout/>}>
            {privateRoutes.map(route =>
              <Route 
              element={route.component} path={route.path} exact={route.exact} key={route.path}
              />
            )}
            <Route path='*' element={<Navigate to='/posts'/>}/>      
          </Route>

        </Routes>
      : <Routes> 
          {publicRoutes.map(route =>
            <Route 
              element={route.component} path={route.path} exact={route.exact} key={route} 
            />
          )}
          <Route path='*' element={<Navigate to='/login'/>}/>
        </Routes>
  )
}

export default AppRouter;