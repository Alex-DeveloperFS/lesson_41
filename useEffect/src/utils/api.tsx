import axios from 'axios'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchData = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await axios.get(API_URL)

    return response.data
  } catch (error) {
    throw new Error('Failed')
  }
}


