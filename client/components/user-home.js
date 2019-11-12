import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {Link, Route} from 'react-router-dom'
import EditUserForm from './editUserForm'
import {editUserThunk} from '../store'


/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
