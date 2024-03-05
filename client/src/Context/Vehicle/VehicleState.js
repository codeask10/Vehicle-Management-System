import React,{useState}from 'react'
import vehicleContext from './VehicleContext';

const VehicleState = (props) => {
    const [vehicleDetails, setVehicleDetails] = useState([]);
    const host = 'http://localhost:5002'
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
        const response = await fetch(`http://localhost:5002/api/vehicle/create`, {
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
            console.log("localstorage vehicle id");
            localStorage.setItem("vehicleID",json._id);
        }
       
    }
    const updateVehicle = async (data) => {
      const id=data._id;
      const response = await fetch(`http://localhost:5002/api/vehicle/update/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({ vehicleNumber:data.vehicleNumber, dcNumber:data.dcNumber, poNumber:data.poNumber, checkInDateTime:data.checkInDateTime, driverName:data.driverName, vehicleType:data.vehicleType, deliveryLocation:data.deliveryLocation, vehicleImage:data.vehicleImage, checkOutDateTime:data.checkOutDateTime })
      });
      // eslint-disable-next-line 
      const json = await response.json();  
  }
  const deleteVehicle = async (id) => {
    const response = await fetch(`http://localhost:5002/api/vehicle/delete/${id}`, {
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
        <vehicleContext.Provider value={{ vehicleDetails, getAllVehicle,createVehicle, updateVehicle,deleteVehicle }}>
            {props.children}
        </vehicleContext.Provider>
    )
}

export default VehicleState