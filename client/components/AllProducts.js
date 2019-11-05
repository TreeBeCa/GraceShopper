import React, {Component} from 'react'
import {connect} from 'react-redux'
import {thunkGetAllHouses} from '../store/treehouse'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getTreeHouses()
  }
  render() {
    const treeHouses = this.props.treeHouses
    console.log(this.props)
    return (
      <div>
        {treeHouses.map(house => (
          <div key={house.id}>
            {house.name} {house.price}
            <img src={house.imageUrl} />
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
    getTreeHouses: () => dispatch(thunkGetAllHouses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
