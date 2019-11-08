import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
function UserProfilePage(props) {
  // const {} = props
  console.log('props: ', props)
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
    email: state.user.email
  }
}

export default connect(mapState)(UserProfilePage)

/**
 * PROP TYPES
 */
// UserProfilePage.propTypes = {
//   email: PropTypes.string
// }
