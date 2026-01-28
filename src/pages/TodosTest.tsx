import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

interface Todo {
  id?: string | number;
  [key: string]: unknown;
}

function TodosTest() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getTodos() {
      try {
        const { data, error } = await supabase.from('todos').select()
        
        if (error) {
          console.error('Error fetching todos:', error)
          setError(error.message)
          return
        }

        if (data) {
           // keys in data are strings, values are unknown. Safe to cast to Todo[] for this generic test
          setTodos(data as Todo[])
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        setError('An unexpected error occurred')
      }
    }

    getTodos()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todos Test</h1>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      <ul className="list-disc pl-5">
        {todos.map((todo, index) => (
          <li key={todo.id || index}>
             {typeof todo === 'object' ? JSON.stringify(todo) : String(todo)}
          </li>
        ))}
      </ul>
      {todos.length === 0 && !error && <p>No todos found.</p>}
    </div>
  )
}
export default TodosTest
