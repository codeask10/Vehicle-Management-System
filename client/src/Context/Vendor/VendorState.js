import React, { useState } from 'react'
import VendorContext from './VendorContext';
import {toast } from 'react-toastify';

const VendorState = (props) => {
    const [vendorDetails, setVendorDetails] = useState([]);
    const host = process.env.REACT_APP_BASE_URL;
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
        const response = await fetch(`${host}/api/vendor/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({id: data.id, vendorName: data.vendorName, companyName: data.companyName, phone: data.phone, email: data.email, dcNumber: data.dcNumber, poNumbers: data.poNumber, address: data.address})
        });
        // eslint-disable-next-line 
        const json = await response.json();
        if(json.success){
            toast.success("New Vendor data created successfully");
        }
    }
    const updateVendor = async (data) => {
      const id=data._id;
      const response = await fetch(`${host}/api/vendor/update/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({id: data.id, vendorName: data.vendorName, companyName: data.companyName, phone: data.phone, email: data.email, dcNumber: data.dcNumber, poNumbers: data.poNumber, address: data.address})
      });
      // eslint-disable-next-line 
      const json = await response.json();  
      if(json.success===true){
        toast.success("Vendor data updated successfully");
      }
      else{
        if(json.success===false){
            toast.error(json.message);
        }
        else{
            toast.error(json);
        }
      }
  }
  const deleteVendor = async (id) => {
    const response = await fetch(`${host}/api/vendor/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
        }
    });
    // eslint-disable-next-line 
    const json = await response.json();  
    if(json.success===true){
        toast.success("Vendor has been deleted ");
    }
    else{
        if(json.success===false){
            toast.error(json.message);
        }
        else{
            toast.error("Internal server error occured");
        }
    }

}
    return (
        <VendorContext.Provider value={{ vendorDetails, getAllVendor,createVendor,updateVendor,deleteVendor}}>
            {props.children}
        </VendorContext.Provider>
    )
}

export default VendorState