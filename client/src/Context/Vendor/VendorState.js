import React, { useState } from 'react'
import VendorContext from './VendorContext';

const VendorState = (props) => {
    const [vendorDetails, setVendorDetails] = useState([]);
    const host = 'http://localhost:5002'
    const getAllVendor = async () => {
        const response = await fetch(`${host}/api/vendor/fetchAllVendor`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // eslint-disable-next-line
        const json = await response.json();
        setVendorDetails(json);
    }
    const createVendor = async (data) => {
        const response = await fetch(`http://localhost:5002/api/vendor/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({id: data.id, vendorName: data.vendorName, companyName: data.companyName, phone: data.phone, email: data.email, dcNumber: data.dcNumber, poNumbers: data.poNumber, address: data.address})
        });
        // eslint-disable-next-line 
        const json = await response.json();
    }
    const updateVendor = async (data) => {
      const id=data._id;
      console.log(id);
      const response = await fetch(`http://localhost:5002/api/vendor/update/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({id: data.id, vendorName: data.vendorName, companyName: data.companyName, phone: data.phone, email: data.email, dcNumber: data.dcNumber, poNumbers: data.poNumber, address: data.address})
      });
      // eslint-disable-next-line 
      const json = await response.json();  
  }
  const deleteVendor = async (id) => {
    const response = await fetch(`http://localhost:5002/api/vendor/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
        }
    });
    // eslint-disable-next-line 
    const json = await response.json();  
}
    return (
        <VendorContext.Provider value={{ vendorDetails, getAllVendor,createVendor,updateVendor,deleteVendor}}>
            {props.children}
        </VendorContext.Provider>
    )
}

export default VendorState