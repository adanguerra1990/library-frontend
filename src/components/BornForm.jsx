import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { All_AUTHORS, EDIT_AUTHOR } from './queries'

const BornForm = () => {
  const [name, setName] = useState('')
  const [bornYear, setBornYear] = useState('')

  const [changeNumber, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: All_AUTHORS }],
  })

  const submit = event => {
    event.preventDefault()

    changeNumber({ variables: { name, setBornTo: parseInt(bornYear) } })

    setName('')
    setBornYear('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('person not found')
    }
  }, [result.data])

  return (
    <div>
      <h2>change number</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            type='text'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>
        <button type='submit'>change number</button>
      </form>
    </div>
  )
}

export default BornForm
