// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {getSingleProduct} from '../store/cart'

// class SingleProduct extends Component {
//   constructor() {
//     super()
//   }

//   componentDidMount() {
//     console.log('PROPS ->', this.props)
//     this.props.viewSingleProduct(this.props.match.params.id)
//   }

//   render() {
//     return (
//       <div>
//         <h1>SINGLE HOUSE</h1>
//         <p>Check the tree house available!</p>
//         <h2>{this.props.treehouses.name}</h2>
//         <img src={this.props.treehouses.imageUrl} />
//         <p>{this.props.treehouses.description}}</p>
//         <button type="submit">Add To Cart</button>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     treehouses: state.treeHouse
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     viewSingleProduct: id => {
//       dispatch(getSingleProduct(id))
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
