import React,{useState}from 'react'
import ProductContext from './ProductContext';
import {toast } from 'react-toastify';


const ProductState = (props) => {
  const [productDetails,setProductDetails] = useState([]);
    const host =process.env.REACT_APP_BASE_URL;
    console.log(host);
    const getAllProducts = async () => {
        const response = await fetch(`${host}/api/product/fetchAllProduct`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // eslint-disable-next-line
        const json = await response.json();
        setProductDetails(json);
    }
    const createProduct = async (data) => {
        const response = await fetch(`${host}/api/product/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({ productName:data.productName, quantity:data.quantity, poNumber:data.poNumber, vendorID:data.vendorID,category:data.category, price:data.price })
        });
        // eslint-disable-next-line 
        const json = await response.json();
       
    }
    const updateProduct = async (data) => {
      const id=data._id;
      const response = await fetch(`${host}/api/product/update/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({ productName:data.productName, quantity:data.quantity, poNumber:data.poNumber, vendorID:data.vendorID,category:data.category, price:data.price })
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
  const deleteProduct= async (id) => {
    const response = await fetch(`${host}/api/product/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
        }
    });
    // eslint-disable-next-line 
    const json = await response.json();  
    if(json.success===true){
        toast.success("Product has been deleted ");
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
        <ProductContext.Provider value={{ productDetails, getAllProducts,createProduct, updateProduct,deleteProduct }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState