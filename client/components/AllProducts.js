import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkGetAllHouses, addToCartThunk} from '../store'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getTreeHouses()
  }
  render() {
    const treeHouses = this.props.treeHouses
    return (
      <div className="TreeHouseContainer">
        {treeHouses.map(house => (
          <div className="SingleTreeHouse" key={house.id}>
            <h2>{house.name}</h2> ${house.price}
            <br />
            <img src={house.imageUrl} />
            <br />
            <button
              type="button"
              onClick={
                this.props.isLoggedIn
                  ? () => this.props.addToCart(house, this.props.user.id)
                  : () => this.props.addToCart(house)
              }
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    treeHouses: state.treeHouses,
    cart: state.cart,
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTreeHouses: () => dispatch(thunkGetAllHouses()),
    addToCart: (house, userId) => dispatch(addToCartThunk(house, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
