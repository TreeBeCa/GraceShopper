import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {addToCartThunk} from '../store'

const OrderHistory = props => {
  const carts = getHistory(props.userId)
  return (
    <table>
      <tbody>
        {carts.map(cart => (
          <tr key={cart.id}>
            <td>{cart.orderDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

async function getHistory(userId) {
  try {
    const {data} = await axios.get(`/api/users/${userId}/carts`)
    console.log('carts', data)
    return data
      .filter(cart => !cart.active)
      .sort((a, b) => a.orderDate > b.orderDate)
  } catch (error) {
    console.error(error)
  }
}

const mapState = state => ({
  userId: state.user.id
})

export default connect(mapState)(OrderHistory)
