import React,{useState} from 'react'
import CheckInContext from './CheckInContext';

const CheckInState = (props) => {
  
  const [vendorData, setVendorData] = useState(null);
  const [productDetails, setProductDetails]=useState(null);
  const host = 'http://localhost:5002';
  const getQuery = async (poNumber) => {
    const response = await fetch(`${host}/api/Query/query/${poNumber}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
        }
    });
    // eslint-disable-next-line
    const json = await response.json();
    console.log(json);
    setVendorData(json.vendorData);
    setProductDetails(json.productDetails);
}
  return (
    <CheckInContext.Provider value={{vendorData,productDetails, getQuery}}>
        {props.children}
    </CheckInContext.Provider>
)
}

export default CheckInState