import React from 'react';
import './App.css';
import DataTotalInfo from './DataInfo';
import Header from './Header';
import DataTable from './DataTable';

function App() {
  return (
    <div className="container">
      <div className="header">
        <Header/>
      </div>
      <div className="menu">
        <a href="#">Link 1</a><br />
        <a href="#">Link 2</a><br />
        <a href="#">Link 3</a>
      </div>
      <div className="content">
      <DataTotalInfo />
      </div>
      <div className="footer">
      <DataTable/>
      </div>
    </div>
  );
}

export default App;
