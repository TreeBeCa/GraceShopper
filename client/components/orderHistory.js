import React from 'react'
import {connect} from 'react-redux'

const OrderHistory = props => (
  <table>
    <tbody>
      <tr>
        <td>order history goes here</td>
      </tr>
    </tbody>
  </table>
)

const mapState = state => ({
  userId: state.user.id
})

export default connect(mapState)(OrderHistory)
