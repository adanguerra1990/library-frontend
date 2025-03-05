import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'
import { useState } from 'react'

const Books = props => {
  const [selectedGenre, setSelectedGenre] = useState('all')
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks

  //Obtener las categorias en array plano
  const categories = [...new Set(books.flatMap(book => book.genres))]

  const filterBooks =
    selectedGenre === 'all'
      ? books
      : books.filter(book => book.genres.includes(selectedGenre))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setSelectedGenre('all')}>all genres</button>
        {categories.map(category => (
          <button key={category} onClick={() => setSelectedGenre(category)}>
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
