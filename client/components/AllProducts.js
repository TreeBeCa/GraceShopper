import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkGetAllHouses, addToCart} from '../store'

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
            <button onClick={() => this.props.addToCart(house)}>
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
    treeHouses: state.treeHouses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTreeHouses: () => dispatch(thunkGetAllHouses()),
    addToCart: house => dispatch(addToCart(house))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
