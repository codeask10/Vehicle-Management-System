import React from 'react'
import VendorProvider from './Vendor/VendorState'
import VehicleProvider from './Vehicle/VehicleState'
import ProductProvider from './Product/ProductState'
import LoginProvider from './Login/LoginState'
import CheckInState from './CheckIn/CheckInState'

const AllProvider = ({ children }) => {
  return (
    <CheckInState>
      <ProductProvider>
        <VendorProvider>
          <VehicleProvider>
            <LoginProvider>
              {/* Wrap other providers as needed */}
              {children}
            </LoginProvider>
          </VehicleProvider>
        </VendorProvider>
      </ProductProvider>
    </CheckInState>
  );
};

export default AllProvider