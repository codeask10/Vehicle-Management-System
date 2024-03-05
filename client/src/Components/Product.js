import React, { useEffect, useContext,useState } from 'react'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductContext from '../Context/Product/ProductContext'
import ProductItems from './Items/ProductItems';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();


const Product = () => {
  const navigate=useNavigate();
  const context = useContext(ProductContext);
  const[product,setProduct]=useState({productName:"", quantity:"", poNumber:"", category:"",vendorID:"", price:""});
  const { productDetails, getAllProducts, createProduct, updateProduct } = context;
  useEffect(() => {
    getAllProducts();
  })
const handleSubmit=(e)=>{
  e.preventDefault();
  if(localStorage.getItem('token')){
    if(!localStorage.getItem('productUpdate')){
      createProduct(product);
      console.log("Creating")
    }else{
      updateProduct(product);
      console.log("updating");
      localStorage.removeItem('productUpdate');
    }
    setProduct({productName:"", quantity:"", poNumber:"", category:"",vendorID:"", price:""})
  }
  else{
    navigate("/Login");
  }
}
const handleChange=(e)=>{
  setProduct({...product,[e.target.name]:e.target.value});
}
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "20px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">Add Product
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="productName"
                  required
                  fullWidth
                  id="productName"
                  type="text"
                  label="Product Name"
                  value={product.productName}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "^(?=.{3-20}$)[A-Za-z]+ [A-Za-z]+$",
                    title: "Enter  name length within 20"
                  }}

                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  name="quantity"
                  required
                  fullWidth
                  id="quantity"
                  type="number"
                  label="Quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "^(?=.{3-40}$)[A-Za-z]+ [A-Za-z]+$",
                    title: "Enter company name length within 40"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  name="vendorID"
                  required
                  fullWidth
                  id="vendorID"
                  type="number"
                  label="Vendor ID"
                  value={product.vendorID}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  name="poNumber"
                  required
                  fullWidth
                  id="poNumber"
                  type="text"
                  label="P.O Number"
                  value={product.poNumber}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "PO[0-9]{6}",
                    title: "Enter a valid code like PO123456"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="category"
                  required
                  fullWidth
                  id="category"
                  type="text"
                  label="Category"
                  value={product.category}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  name="price"
                  required
                  fullWidth
                  id="price"
                  type="text"
                  label="Price"
                  value={product.price}
                  onChange={handleChange}
                />
              </Grid>

            </Grid>
            {(!localStorage.getItem('productUpdate')) ? <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginLeft: "30%", mt: 1, mb: 2, width: "40%" }}
            >
              submit
            </Button> : <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginLeft: "30%", mt: 1, mb: 2, width: "40%" }}
            >
              update
            </Button>}
          </Box>
        </Box>
      </Container>
      <Container>
        <div className=" row">
          {productDetails.map((data) => (
            <div className=" col-md-3" key={data.poNumber}>
              <ProductItems data={data} setProduct={setProduct} />
            </div>
          ))}
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default Product