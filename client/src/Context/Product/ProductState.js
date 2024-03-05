import React,{useState}from 'react'
import ProductContext from './ProductContext';

const ProductState = (props) => {
  const [productDetails, setProductDetails] = useState([]);
    const host = 'http://localhost:5002'
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
        const response = await fetch(`http://localhost:5002/api/product/create`, {
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
      const response = await fetch(`http://localhost:5002/api/product/update/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({ productName:data.productName, quantity:data.quantity, poNumber:data.poNumber, vendorID:data.vendorID,category:data.category, price:data.price })
      });
      // eslint-disable-next-line 
      const json = await response.json();  
  }
  const deleteProduct= async (id) => {
    const response = await fetch(`http://localhost:5002/api/product/delete/${id}`, {
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
        <ProductContext.Provider value={{ productDetails, getAllProducts,createProduct, updateProduct,deleteProduct }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState