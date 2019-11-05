import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import SingleProduct from './components/singleProductView'

const App = () => {
  return (
    <div>
      <Navbar />
      <SingleProduct />
      <Routes />
    </div>
  )
}

export default App
