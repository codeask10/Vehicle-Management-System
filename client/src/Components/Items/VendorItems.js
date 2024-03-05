import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import VendorContex from '../../Context/Vendor/VendorContext';

const VendorItems = (props) => {
    const context = useContext(VendorContex);
    const { deleteVendor } = context;
    const navigate = useNavigate();
    const { data, setVendor } = props;
    const { _id, id, vendorName, companyName, phone, email, dcNumber, address } = data

    const handleClick = () => {
        if (localStorage.getItem('token')) {
            setVendor({ _id: _id, id: id, vendorName: vendorName, companyName: companyName, phone: phone, email: email, dcNumber: dcNumber, address: address });
            localStorage.setItem('update', true);
        }
        else {
            navigate('/Login');
        }
    }
    const handleDelete = () => {
        if (localStorage.getItem('token')) {
            deleteVendor(_id);
        }
        else {
            navigate('/Login');
        }
    }
    return (
        <div>
            <div className="my-3">
                <div className="ui cards">
                    <div className="green card">
                        <div className="content">
                            <div className="header">
                                {vendorName}
                            </div>
                            <div className="meta">
                                {companyName}
                            </div>
                            <div className="description" style={{ marginTop: '5px', fontSize: "16px" }}>
                                <p><b>D.C Number</b>: {dcNumber} </p>
                                <p><i className="phone icon"></i>{phone}</p>
                                <p><i className="envelope icon"></i> {email} </p>
                                {/* <ul className="ui list">
                                    <b>P.O Numbers</b>
                                    {poNumbers.map((poNumber, index) => (
                                        <li key={index}>{poNumber}</li>
                                    ))}
                                </ul> */}
                                <p><i className="map marker alternate icon"></i>: {address} </p>
                            </div>

                        </div>
                        <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic green button" onClick={handleClick}>Edit</div>
                                <div className="ui basic red button" onClick={handleDelete}>Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VendorItems