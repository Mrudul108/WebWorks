import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Assignment 1 - Counter Operations</h1>
      <div className="card">
        <p className='btn btn-primary w-25 mx-auto disabled'>
          count is {count}
        </p>
        <p className='d-flex justify-content-center gap-3'>
          <button onClick={() => setCount((count) => count + 1)}>Increase Count</button> 
          <button onClick={() => setCount((0))}>Reset Count</button> 
          <button onClick={() => setCount((count) => count - 1)}>Decrese Count</button>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
