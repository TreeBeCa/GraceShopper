import React, {Component} from 'react'
import {connect} from 'react-redux'

class SingleProduct extends Component {
  consturctor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>SINGLE HOUSE</h1>
        <p>Check the tree house available!</p>
        <h2>House's Name</h2>
        <img>Image</img>
        <p>Description</p>
        <button type="submit">Add To Cart</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.treeHouse
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => {
      dispatch(getSingleProduct(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct)
