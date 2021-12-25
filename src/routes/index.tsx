import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from 'src/features/main';
import Addresses from 'src/features/addresses';
import { ROUTES } from './constants';

const AppRoutes = () => {
  return (<Routes>
    <Route path={ROUTES.static.main} element={<Main />} />
    <Route path={ROUTES.static.transfer} element={<Main />} />
    <Route path={ROUTES.static.addresses} element={<Addresses />} />
    <Route path='*' element={<Navigate replace to={ROUTES.static.main} />} />
  </Routes>);
};

export default AppRoutes;

