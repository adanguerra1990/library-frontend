import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { All_AUTHORS, EDIT_AUTHOR } from './queries'
import Select from 'react-select'

const BornForm = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [bornYear, setBornYear] = useState('')

  const { data } = useQuery(All_AUTHORS)

  const [changeBornYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: All_AUTHORS }],
  })

  const authorOptions = data
    ? data.allAuthors.map(autor => ({ value: autor.name, label: autor.name }))
    : []

  const submit = event => {
    event.preventDefault()

    if (!selectedAuthor) {
      alert('Please select an author')
      return
    }

    changeBornYear({
      variables: { name: selectedAuthor.value, setBornTo: parseInt(bornYear) },
    })

    setSelectedAuthor('')
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
          <label>Name</label>
          <Select
            type='text'
            value={selectedAuthor}
            onChange={selectedOption => setSelectedAuthor(selectedOption)}
            options={authorOptions}
            placeholder='Select author'
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
