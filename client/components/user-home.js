import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import EditUserForm from './editUserForm'
import axios from 'axios'
import {editUserThunk} from '../store'

/**
 * COMPONENT
 */

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      name: '',
      email: '',
      address: ''
    }
    this.props = this.props
    this.handleChange = this.handleChange.bind(this)
    // this.props.editUserThunk = this.props.editUserThunk.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log('this', this)
    editUserThunk(this.state)
    this.setState({
      username: '',
      name: '',
      email: '',
      address: ''
    })
  }

  render() {
    const {user} = this.props
    console.log('props', this.props)
    console.log('this', this)
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
          render={() => (
            <EditUserForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          )}
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
const mapDispatchToProps = dispatch => {
  return {
    editUserThunk: user => dispatch(editUserThunk(user))
  }
}

export default connect(mapState, mapDispatchToProps)(UserProfilePage)

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
