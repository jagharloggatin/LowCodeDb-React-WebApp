import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ViewColumnsRoute } from './Routes/ViewColumnsRoute';
import { ViewDatabaseRoute } from './Routes/ViewDatabaseRoute';
import { ViewTablesRoute } from './Routes/ViewTablesRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ViewDatabaseRoute/>}></Route>
      <Route path="/tables" element={<ViewTablesRoute/>}></Route>
      <Route path="/columns" element={<ViewColumnsRoute/>}></Route>
    </Routes>
  );
}

export default App;
