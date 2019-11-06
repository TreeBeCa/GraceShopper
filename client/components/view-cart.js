import React, {Component} from 'react'
import {connect} from 'react-redux'

class ViewCart extends Component {
  constructor() {
    super()
    this.state = {
      cart: [
        {
          treeHouse: {name: 'best treehouse'},
          quantity: 1
        }
      ]
    }
  }

  render() {
    const cart = this.state.cart
    return (
      <div>
        <h1>inside cart</h1>
        {cart.map(function(currTreeHouse) {
          return (
            <div>
              {currTreeHouse.treeHouse.name}
              {currTreeHouse.quantity}
            </div>
          )
        })}
      </div>
    )
  }
}

export default ViewCart

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ViewCart);
