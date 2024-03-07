import React,{useState}from 'react'
import vehicleContext from './VehicleContext';
import {toast } from 'react-toastify';

const VehicleState = (props) => {
    const [vehicleDetails, setVehicleDetails] = useState([]);
    const host = process.env.REACT_APP_BASE_URL;
    const getAllVehicle = async () => {
        const response = await fetch(`${host}/api/vehicle/fetchAllVehicle`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // eslint-disable-next-line
        const json = await response.json();
        setVehicleDetails(json);
    }
    const createVehicle = async (data) => {
        const response = await fetch(`${host}/api/vehicle/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({ vehicleNumber:data.vehicleNumber, dcNumber:data.dcNumber, poNumber:data.poNumber, checkInDateTime:data.checkInDateTime, driverName:data.driverName, vehicleType:data.vehicleType, deliveryLocation:data.deliveryLocation, vehicleImage:data.vehicleImage, checkOutDateTime:data.checkOutDateTime })
        });
        // eslint-disable-next-line 
        const json = await response.json();
        if(localStorage.getItem('checkIn')){
            localStorage.setItem("vehicleID",json.saveVehicle._id);
        }
        if(json.success){
            toast.success("New vehicle data created successfully");
        }
       
    }
    const updateVehicle = async (data) => {
      const id=data._id;
      const response = await fetch(`${host}/api/vehicle/update/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({ vehicleNumber:data.vehicleNumber, dcNumber:data.dcNumber, poNumber:data.poNumber, checkInDateTime:data.checkInDateTime, driverName:data.driverName, vehicleType:data.vehicleType, deliveryLocation:data.deliveryLocation, vehicleImage:data.vehicleImage, checkOutDateTime:data.checkOutDateTime })
      });
      // eslint-disable-next-line 
      const json = await response.json(); 
      if(json.success===true){
        toast.success("Vehicle data updated successfully");
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
  const deleteVehicle = async (id) => {
    const response = await fetch(`${host}/api/vehicle/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
        }
    });
    // eslint-disable-next-line 
    const json = await response.json();  
    if(json.success===true){
        toast.success("Vehicle has been deleted ");
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
        <vehicleContext.Provider value={{ vehicleDetails, getAllVehicle,createVehicle, updateVehicle,deleteVehicle }}>
            {props.children}
        </vehicleContext.Provider>
    )
}

export default VehicleState