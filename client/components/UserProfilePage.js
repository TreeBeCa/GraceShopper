import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getUserThunk} from '../store'

/**
 * COMPONENT
 */
export const UserProfilePage = props => {
  // const {} = props

  return (
    <div>
      <h3>Welcome to Profile Page</h3>
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    username: state.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserThunk: userId => dispatch(getUserThunk(userId))
  }
}

export default connect(mapState, mapDispatchToProps)(UserProfilePage)

/**
 * PROP TYPES
 */
// UserProfilePage.propTypes = {
//   email: PropTypes.string
// }
