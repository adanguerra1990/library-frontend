import { useQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE, USER_FAVORITE_GENRE } from './queries'

const Recomendation = ({ show }) => {
  const { data: userData, loading: userLoading } = useQuery(USER_FAVORITE_GENRE)
  const favoriteGenre = userData?.me?.favoriteGenre

  console.log('favoriteGenre..', favoriteGenre)

  const { data: booksData, loading: booksLoading } = useQuery(
    ALL_BOOKS_BY_GENRE,
    {
      variables: { genre: favoriteGenre },
      skip: !favoriteGenre,
    }
  )

  console.log('booksData..', booksData)

  if (!show) {
    return null
  }

  if (userLoading || booksLoading) {
    return <div>loading...</div>
  }

  const books = booksData?.allBooks || []
  console.log('books...', books)

  return (
    <div>
      <h2>Recomendations</h2>
      <p>
        Books in your favorite genre: <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map(book => (
            <tr key={book.title}>
              <th>{book.title}</th>
              <th>{book.author.name}</th>
              <th>{book.published}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recomendation
