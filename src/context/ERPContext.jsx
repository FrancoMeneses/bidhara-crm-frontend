import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ERPContext = createContext()

export function ErpProvider ({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    status: false
  })

  const [validateUser, setValidateUser] = useState({
    isValidating: false,
    code: -1
  })

  useEffect(() => {
    if (!user.status) {
      navigate('/login')
    }
  }, [user.status])

  const handleUser = async (user) => {
    setValidateUser({
      ...validateUser,
      isValidating: true
    })
    const res = await fetch('http://localhost:1222/users/validate', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: user
    })
    const response = await res.json()
    if (!response.success && response.code === 0) {
      setValidateUser({
        ...validateUser,
        code: 0,
        isValidating: false
      })
    }
    if (!response.success && response.code === 1) {
      setValidateUser({
        ...validateUser,
        code: 1,
        isValidating: false
      })
    }
    if (response.success) {
      console.log(response)
      setValidateUser({
        ...validateUser,
        isValidating: false,
        code: -1
      })
      setUser({
        status: true,
        name: response.message.user_name,
        lastname: response.message.user_lastname,
        createdat: response.message.user_createdat,
        id: response.message.user_id,
        email: response.message.user_email,
        role: response.message.role_id
      })
      navigate('/')
    }
  }

  return (
    <ERPContext.Provider
      value={{
        user,
        setUser,
        handleUser,
        validateUser,
        setValidateUser
      }}
    >
      {children}
    </ERPContext.Provider>
  )
}
