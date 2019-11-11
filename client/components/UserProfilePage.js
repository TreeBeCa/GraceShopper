import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getUserThunk} from '../store'

/**
 * COMPONENT
 */
class UserProfilePage extends Component {
  componentDidMount() {
    this.props.getUserThunk()
  }

  // const {} = props
  render() {
    console.log('props: ', this.props)
    return (
      <div>
        <h3>Welcome to Profile Page</h3>
        Username: {this.props.username}
        <br />
        Email: {this.props.email}
        <br />
        Profile Pic: {this.props.profileImgUrl}{' '}
        <img src={this.props.profileImgUrl} />
      </div>
    )
  }
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
