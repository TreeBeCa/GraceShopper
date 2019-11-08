import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store'

class UserCart extends Component {
  componentDidMount() {
    this.props.getUserCart()
  }

  render() {
    const cart = this.props.user.carts || []
    return (
      <div>
        <h1>inside user cart</h1>
        {/* later we will replace curr.id with the actual treehouse object */}
        {cart.map(curr => curr.id)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const userId = props.match.params.userId
  return {
    getUserCart: () => dispatch(getCartThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)
