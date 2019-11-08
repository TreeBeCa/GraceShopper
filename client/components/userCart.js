import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserCart extends Component {
  render() {
    const cart = this.props.cart
    if (cart.length) {
      return (
        <div>
          <h1>Welcome to your cart</h1>
          <table className="checkout">
            <tbody>
              {cart.map((elem, index) => (
                <tr key={index}>
                  <td>{elem.treeHouse.name}</td>
                  <td>{elem.treeHouse.price}</td>
                  <td>{elem.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      return <h1>Your cart is empty</h1>
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

export default connect(mapStateToProps, null)(UserCart)
