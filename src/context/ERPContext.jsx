import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ERPContext = createContext()

export function ErpProvider ({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    status: false
  })

  useEffect(() => {
    if (!user.status) {
      navigate('/login')
    }
  }, [user.status])

  const validateUser = () => {
    console.log(user.status)
  }

  return (
    <ERPContext.Provider
      value={{
        user,
        setUser,
        validateUser
      }}
    >
      {children}
    </ERPContext.Provider>
  )
}
