import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  checkoutThunk,
  // removeTreeHouse,
  addToCartThunk,
  removeOneThunk,
  deleteAllThunk
} from '../store'

class UserCart extends Component {
  // deleteButtton(id) {
  //   try {
  //     this.props.removeTreeHouse(id)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  render() {
    const {cart, user} = this.props
    let cartPriceTotal = 0
    if (cart.length) {
      cart.forEach(element => {
        let treehousePrice = element.treehouse.price
        let quantity = element.quantity
        let total = treehousePrice * quantity
        cartPriceTotal += total
      })
    }
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
                  <td>${elem.treehouse.price}</td>
                  <td>{elem.quantity}</td>
                  <td>
                    <button
                      type="button"
                      onClick={
                        this.props.isLoggedIn
                          ? () =>
                              this.props.addToCart(
                                elem.treehouse,
                                this.props.user.id
                              )
                          : () => this.props.addToCart(elem.treehouse)
                      }
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={
                        this.props.isLoggedIn
                          ? () =>
                              this.props.removeOneFromCart(
                                elem.treehouse,
                                this.props.user.id
                              )
                          : () => this.props.removeOneFromCart(elem.treehouse)
                      }
                    >
                      -
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={
                        this.props.isLoggedIn
                          ? () =>
                              this.props.deleteAllFromCart(
                                elem.treehouse,
                                this.props.user.id
                              )
                          : () => this.props.deleteAllFromCart(elem.treehouse)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>Total Price: ${cartPriceTotal}</div>

          {this.props.isLoggedIn ? (
            <button
              type="button"
              onClick={() => {
                this.props.checkout(user.id)
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
    treeHouses: state.treeHouses,
    user: state.user,
    cart: state.cart,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    checkout: userId => dispatch(checkoutThunk(userId)),
    addToCart: (house, userId) => dispatch(addToCartThunk(house, userId)),
    removeOneFromCart: (house, userId) =>
      dispatch(removeOneThunk(house, userId)),
    deleteAllFromCart: (house, userId) =>
      dispatch(deleteAllThunk(house, userId))
  }
}

export default connect(mapStateToProps, mapDispatch)(UserCart)
