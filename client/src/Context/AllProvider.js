import React, { Children } from 'react'
import CheckInProvider from './CheckIn/CheckInState'
import VendorProvider from './Vendor/VendorState'
import VehicleProvider from './Vehicle/VehicleState'
import ProductProvider from './Product/ProductState'
import LoginProvider from './Login/LoginState'

const AllProvider = () => {
  return (
    <CheckInProvider>
      <VendorProvider>
        <VehicleProvider>
          <ProductProvider>
            <LoginProvider>
              {Children}
            </LoginProvider>
          </ProductProvider>
        </VehicleProvider>
      </VendorProvider>
    </CheckInProvider>
  )
}

export default AllProvider