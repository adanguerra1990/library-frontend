import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from './queries'

const LginForm = ({ setError, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPasswor] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async event => {
    event.preventDefault()

    login({ variables: { username, password } })
    setUsername('')
    setPasswor('')
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>username</label>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPasswor(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LginForm
