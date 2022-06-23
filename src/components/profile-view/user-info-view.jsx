import React from "react";

function UserInfoView({ email, name }) {
  return (
    <>
      <h4>Your Info: </h4>
      <p>Name: {name}</p>
      <p>E-mail: {email}</p>
    </>
  )
}

export default UserInfoView