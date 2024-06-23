import {useEffect, useState} from 'react'
import {UserInterface} from '../types/User.interface.ts'
import {fetchData} from '../utils/api.tsx'

const UseEffect = () => {
  const [id, setId] = useState<number>(0)
  const [users, setUsers] = useState<UserInterface[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchDataAndHandleLoading = async () => {
      try {
        setIsLoading(true)
        const data = await fetchData()
        setUsers(data)
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false)
      }
    }

    fetchDataAndHandleLoading();

    return () => {

    }
  }, [])

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value
    setId(Number.isNaN(value) ? 0 : value)
    if (value > 10) {
      setError('Enter value less than 10')
    } else {
      setError(null)
    }
  }

  return (
    <div>
      <h4>Render of users</h4>
      <input type="number" value={id === 0 ? '' : id} onChange={handleIdChange} placeholder="Enter ID"/>
      {isLoading && <p>Loading...</p>}
      {error && <h2>{error}</h2>}
      <ul>
        {users
          .filter((user) => id === 0 || user.id === id)
          .map((user: UserInterface) => (
            <li key={user.id}>
              {user.name}, {user.email}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default UseEffect


