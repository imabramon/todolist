import { useState } from 'react'

const useInput = (value) => {
  const [state, setState] = useState(value)
  const onChange = (e) => {
    setState(e.target.value)
  }
  const clear = () => {
    setState(value)
  }
  return [state, onChange, clear]
}

export default useInput
