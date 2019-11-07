import React, {Component} from 'react'
import {connect} from 'react-redux'
import {treehouseCartThunk} from '../store'

class ViewCart extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     cart: [
  //       {
  //         treeHouse: {name: 'best treehouse'},
  //         quantity: 1
  //       }
  //     ]
  //   }
  // }

  componentDidMount() {
    this.props.getTreehouseCart()
  }

  render() {
    // const cart = this.state.cart

    const cart = this.props.cart || []
    console.log('this props compo', this.props.cart)
    return (
      <div>
        <h1>inside view cart</h1>
        {/* {cart.map(function (currTreeHouse) {
          return (
            <div>
              {currTreeHouse.treeHouse.name}
              {currTreeHouse.quantity}
            </div>
          )
        })} */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const cartId = props.match.params.cartId
  return {
    getTreehouseCart: () => dispatch(treehouseCartThunk(cartId))
  }
}

// export default ViewCart

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart)
