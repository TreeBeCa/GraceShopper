import React, {Component} from 'react'
import {connect} from 'react-redux'
import {checkout} from '../store'

class UserCart extends Component {
  render() {
    console.log('props in userCart', this.props)
    const cart = this.props.cart
    console.log('cart-> ', cart)
    let cartPriceTotal = 0
    if (cart.length) {
      cart.forEach(element => {
        let treehousePrice = element.treehouse.price
        let quantity = element.quantity
        let total = treehousePrice * quantity
        cartPriceTotal += total
      })
    }
    console.log('carPriceTotal->', cartPriceTotal)
    if (cart.length) {
      return (
        <div>
          {this.props.isLoggedIn ? (
            <h1>Welcome to your cart {this.props.user.email}! </h1>
          ) : (
            <h1>Welcome to your cart, Guest!</h1>
          )}
          <table className="checkout">
            <tbody>
              {cart.map(elem => (
                <tr key={elem.treehouse.id}>
                  <td>{elem.treehouse.name}</td>
                  <td>{elem.treehouse.price}</td>
                  <td>{elem.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>Total Price:{cartPriceTotal}</div>

          {this.props.isLoggedIn ? (
            <button
              type="button"
              onClick={() => {
                this.props.checkout()
                this.props.history.push('/checkedOut')
              }}
            >
              check out
            </button>
          ) : (
            <h3>please log in or create an account to check out</h3>
          )}
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
    cart: state.cart,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    checkout: () => {
      dispatch(checkout())
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(UserCart)
