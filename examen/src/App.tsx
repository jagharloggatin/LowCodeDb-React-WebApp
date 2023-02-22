import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ViewDatabaseRoute } from './Routes/ViewDatabaseRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ViewDatabaseRoute/>}></Route>
    </Routes>
  );
}

export default App;
