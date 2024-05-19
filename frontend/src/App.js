
import React from 'react';
import UserTable from './components/UserTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserDetail from './components/UserDetail';

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
        <Route path='/' element={<UserTable />}></Route>
        <Route path='/view/:id' element={<UserDetail />}></Route>
    </Routes>
   </BrowserRouter>
  );
};

export default App;
