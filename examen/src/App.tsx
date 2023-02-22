import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ViewColumnsRoute } from './routes/ViewColumnsRoute';
import { ViewDatabaseRoute } from './routes/ViewDatabaseRoute';
import { ViewTablesRoute } from './routes/ViewTablesRoute';

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