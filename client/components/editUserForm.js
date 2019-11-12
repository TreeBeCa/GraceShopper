import React from 'react'

const EditUserForm = props => (
  <div className="form">
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="username">
          <small>User Name</small>
        </label>
        <input
          name="username"
          type="text"
          value={props.user.username}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label htmlFor="name">
          <small>Full Name</small>
        </label>
        <input
          name="name"
          type="text"
          value={props.user.name}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input
          name="email"
          type="text"
          value={props.user.email}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label htmlFor="address">
          <small>Mailing Address</small>
        </label>
        <input
          name="address"
          type="text"
          value={props.user.address}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <button type="submit" onSubmit={props.handleSubmit}>
          update
        </button>
      </div>
    </form>
  </div>
)

export default EditUserForm
