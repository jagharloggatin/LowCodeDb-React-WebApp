import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ViewColumnsRoute } from './routes/ViewColumnsRoute';
import { ViewDatabaseRoute } from './routes/ViewDatabaseRoute';
import { ViewTablesRoute } from './routes/ViewTablesRoute';

// we set the routes to our different pages
// "/" marks the frontpage
// ":" in path marks the parameters we retrieve with help of the useParams hook
function App() {
  return (
    <Routes>
      <Route path="/" element={<ViewDatabaseRoute/>}></Route>
      <Route path="/tables/:databaseName" element={<ViewTablesRoute/>}></Route>
      <Route path="/columns/:databaseName/:tableName" element={<ViewColumnsRoute/>}></Route>
    </Routes>
  );
}

export default App;
