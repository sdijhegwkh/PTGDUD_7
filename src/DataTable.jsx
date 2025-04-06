import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './DataTable.css';

const DataTableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);

  const getRandomAvatar = () => {
    const randomNum = Math.floor(Math.random() * 5) + 1;
    return `/icons/Avatar${randomNum}.png`;
  };

  // Định nghĩa các cột
  const columns = [
    {
      name: 'CUSTOMER NAME',
      selector: row => row.customerName,
      sortable: true,
      cell: row => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={getRandomAvatar()} 
            alt="Avatar" 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              marginRight: '10px'
            }} 
          />
          {row.customerName}
        </div>
      ),
    },
    {
      name: 'COMPANY',
      selector: row => row.company,
      sortable: true,
    },
    {
      name: 'ORDER VALUE',
      selector: row => row.orderValue,
      sortable: true,
      format: row => `$${row.orderValue}`,
    },
    {
      name: 'ORDER DATE',
      selector: row => row.orderDate,
      sortable: true,
    },
    {
      name: 'STATUS',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span className={`status-badge ${row.status.toLowerCase().replace(' ', '-')}`}>
          {row.status}
        </span>
      ),
    },
  ];

  // Lấy dữ liệu từ API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://67e3675c97fc65f5353981ec.mockapi.io/DataTAbleData');
      const apiData = await response.json();
      
      // Thêm avatar ngẫu nhiên vào mỗi item
      const dataWithAvatars = apiData.map(item => ({
        ...item,
        avatar: getRandomAvatar()
      }));
      
      setData(dataWithAvatars);
      setTotalRows(apiData.length);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Custom styles cho bảng
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f8f9fa',
        fontWeight: 'bold',
        fontSize: '14px',
      },
    },
    rows: {
      style: {
        fontSize: '14px',
        '&:not(:last-of-type)': {
          borderBottom: '1px solid #e9ecef',
        },
      },
    },
  };

  return (
    <div className="data-table-container">
      <div className="report-header">
        <div className="report-title">
          <img src="/icons/File text 1.png" alt="Report" className="report-icon" />
          <h3>Detailed report</h3>
        </div>
        <div className="report-actions">
          <button className="icon-button">
            <img src="/icons/Download.png" alt="Export" />
            <span>Export</span>
          </button>
          <button className="icon-button">
            <img src="/icons/Move up.png" alt="Import" />
            <span>Import</span>
          </button>
        </div>
      </div>
      
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        progressPending={loading}
        pagination
        paginationTotalRows={totalRows}
        paginationComponentOptions={{
          noRowsPerPage: true
        }}
      />
    </div>
  );
};

export default DataTableComponent;