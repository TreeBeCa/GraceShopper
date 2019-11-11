import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import EditUserForm from './editUserForm'

/**
 * COMPONENT
 */

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    //todo
  }

  render() {
    const {user} = this.props
    console.log('props', this.props)
    return (
      <div>
        <h3>Welcome, {user.username}</h3>
        Name: {user.name} <br />
        Email: {user.email}
        <br />
        address: {user.address}
        <br />
        Profile Img: <img className="profileImage" src={user.profileImgUrl} />
        <br />
        <Link to="/home/edit">Edit your account</Link>
        <hr />
        <Route
          path="/home/edit"
          render={() => <EditUserForm handleChange={this.handleChange} />}
        />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserProfilePage)

// export const UserHome = props => {
//   const {email} = props

//   return (
//     <div>
//       <h3>Welcome, {email}</h3>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     email: state.user.email
//   }
// }

// export default connect(mapState)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
