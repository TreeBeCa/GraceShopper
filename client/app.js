import React from 'react'

import {Navbar, AllProducts} from './components'
import Routes from './routes'
// import SingleProduct from './components/singleProductView'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <SingleProduct /> */}
      <Routes />
      {/* <AllProducts /> */}
    </div>
  )
}

export default App
