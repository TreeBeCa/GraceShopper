import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getUserThunk} from '../store'

/**
 * COMPONENT
 */
// export const UserProfilePage = props => {
class UserProfilePage extends Component {
  componentDidMount() {}

  handleChange(event) {}

  render() {
    // const {} = props
    console.log('props', this.props)
    return (
      <div>
        <h3>Welcome to Profile Page</h3>
        Username: {this.props.username}
        <br />
        Email: {this.props.email}
        <br />
        Profile Img: <img src={this.props.profileImgUrl} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    me: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(UserProfilePage)

/**
 * PROP TYPES
 */
// UserProfilePage.propTypes = {
//   email: PropTypes.string
// }
