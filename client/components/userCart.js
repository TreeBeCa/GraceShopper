import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserCartThunk, createNewCart} from '../store'

class UserCart extends Component {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.getUserCart(this.props.user.id)
    } else {
      this.props.createNewCart()
    }
  }

  render() {
    const cart = this.props.cart
    if (cart.treehouses) {
      return (
        <div>
          <h1>inside user cart</h1>
          {/* later we will replace curr.id with the actual treehouse object */}
          <h2>{cart.treehouses[0].name}</h2>
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

const mapDispatchToProps = (dispatch, props) => {
  console.log('userCart props in mapProps:', props)
  return {
    //treeehouseCartThunk () =>
    getUserCart: userId => dispatch(getUserCartThunk(userId)),
    createNewCart: () => dispatch(createNewCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)
