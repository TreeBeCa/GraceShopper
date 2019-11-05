import React from 'react'

import {Navbar, AllProducts} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <AllProducts />
      <Routes />
    </div>
  )
}

export default App
