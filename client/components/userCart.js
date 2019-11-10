import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {checkout, removeTreeHouse} from '../store'

class UserCart extends Component {
  deleteButtton(houseId) {
    try {
      this.props.removeTreeHouse(houseId)
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    console.log('props in userCart', this.props)
    const cart = this.props.cart
    // console.log('cart-> ', cart)
    let cartPriceTotal = 0
    if (cart.length) {
      cart.forEach(element => {
        let treeHousePrice = element.treeHouse.price
        let quantity = element.quantity
        let total = treeHousePrice * quantity
        cartPriceTotal += total
      })
    }
    console.log('carPriceTotal->', cartPriceTotal)
    if (cart.length) {
      console.log('cart-> ', cart)
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
                <tr key={elem.treeHouse.id}>
                  <td>{elem.treeHouse.name}</td>
                  <td>{elem.treeHouse.price}</td>
                  <td>{elem.quantity}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        this.deleteButtton(elem.treeHouse.id)
                      }}
                    >
                      Delete
                    </button>
                  </td>
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
                console.log('still here')
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
    removeTreeHouse: id => {
      dispatch(removeTreeHouse(id))
    },
    checkout: () => {
      dispatch(checkout())
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(UserCart)
