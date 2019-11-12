import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class OrderHistory extends React.Component {
  constructor(props) {
    super()
    this.state = {
      userId: props.userId,
      carts: []
    }
  }

  async componentDidMount() {
    const carts = await this.getCarts()
    this.setState({carts})
  }

  render() {
    return (
      <div>
        {this.state.carts.map(cart => (
          <table key={cart.id}>
            <tbody>
              <tr>
                <td>{cart.orderDate}</td>
                <td>total: ${cart.total}</td>
              </tr>

              {cart.treehouses.map(treehouse => (
                <tr key={treehouse.id}>
                  <td>
                    {treehouse.quantity} x {treehouse.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    )
  }

  getCarts = async function() {
    try {
      const {data} = await axios.get(`/api/users/${this.state.userId}/carts`)
      return data
        .filter(cart => !cart.active)
        .sort((a, b) => a.orderDate < b.orderDate)
    } catch (error) {
      console.error(error)
    }
  }
}

const mapState = state => ({
  userId: state.user.id
})

export default connect(mapState)(OrderHistory)
