import React from 'react'

const EditUserForm = props => (
  <div className="form">
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="username">
          <small>User Name</small>
        </label>
        <input name="username" type="text" />
      </div>
      <div>
        <label htmlFor="name">
          <small>Full Name</small>
        </label>
        <input name="name" type="text" />
      </div>
      <div>
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input name="email" type="text" />
      </div>
      <div>
        <label htmlFor="address">
          <small>Mailing Address</small>
        </label>
        <input name="address" type="text" />
      </div>
      <div>
        <button type="submit">update</button>
      </div>
    </form>
  </div>
)

export default EditUserForm
