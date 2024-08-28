import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function useFetchTasks() {
  const [tasksItems, setTasksItems] = useState([])
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      console.log('Fetching tasks for user:', session.user.id)
      fetch(`/api/profile/task?userId=${session.user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Tasks fetched successfully:', data.task)
            setTasksItems(data.task)
          } else {
            console.error('Error fetching tasks:', data.error)
          }
        })
        .catch(error => console.error('Error during fetch:', error))
    }
  }, [session])

  return { tasksItems }
}
