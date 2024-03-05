import React,{useContext}from 'react'
import VehicleContex from '../../Context/Vehicle/VehicleContext';
const VehicleItems = (props) => {
    const context = useContext(VehicleContex);
    const { deleteVehicle } = context;
    const { data, setVehicle} = props
    const { vehicleNumber, dcNumber, poNumber, checkInDateTime, driverName, vehicleType, deliveryLocation, qualityCheck,vehicleImage, checkOutDateTime,_id} = data;
    const handleEdit=()=>{
        localStorage.setItem('vehicleUpdate',true);
        setVehicle({vehicleNumber: vehicleNumber, dcNumber:dcNumber , poNumber:poNumber, checkInDateTime: checkInDateTime, driverName: driverName, vehicleType:vehicleType, deliveryLocation:deliveryLocation, checkOutDateTime: checkOutDateTime});

    }
    const handleDelete=()=>{
        if(localStorage.getItem('token')){
            deleteVehicle(_id);
            window.location.reload();
        }
    }
    return (
        <div>
            <div className="my-3">
                <div className="ui cards">
                    <div className="green card">
                        <div className="content">
                            <img className="right floated mini ui image" src={vehicleImage} alt="profileImage" />
                            <div className="header mt-2">
                                {driverName}
                            </div>
                            <div className="description" style={{ marginTop: '20px', fontSize: "16px" }}>
                                <p><b>D.C Number</b>: {dcNumber} </p>
                                <p><b>P.O Number</b>: {poNumber} </p>
                                <p><b>Vehicle Number</b>: {vehicleNumber} </p>
                                <p><b>Vehicle Type</b>: {vehicleType} </p>
                                <p><b> Quality Check</b>: {qualityCheck} </p>
                                <p><b>Location </b>: {deliveryLocation} </p>
                                <p><b>CheckIn</b>: {checkInDateTime} </p>
                                <p><b>CheckOut</b>: {checkOutDateTime} </p>
                            </div>

                        </div>
                        <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic green button" onClick={handleEdit}>Edit</div>
                                <div className="ui basic red button" onClick={handleDelete}>Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VehicleItems