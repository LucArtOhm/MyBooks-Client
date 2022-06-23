import React from 'react';
import { Form, Button } from 'react-bootstrap';

function UpdateUserView({ handleSubmit, handleUpdate }) {





  return (
    <>
      <h4>Update</h4>
      <Form>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type='text'
            defaultValue={user.Username}
            onChange={e => handleUpdate(e)}
            required
            placeholder='Enter a username'
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            defaultValue={user.Password}
            onChange={e => handleUpdate(e)}
            required
            minLength='8'
            placeholder='Your password must be 6 or more characters ;)'
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>E-mail address:</Form.Label>
          <Form.Control
            type='email'
            defaultValue={user.Email}
            onChange={e => handleUpdate(e.target.value)}
            required
            placeholder='Enter your email address'
          />
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          onClick={handleSubmit}>
          Update
        </Button>
      </Form>
    </>
  )
}

export default UpdateUserView