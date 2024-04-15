import { useContext } from 'react'
import { ERPContext } from '../context/ERPContext'

export const Home = () => {
  const { user, handleLogout } = useContext(ERPContext)

  return (
    <div className='flex flex-col gap-3'>
      <section>User:</section>
      <p>{user.id}</p>
      <p>{user.name}</p>
      <p>{user.lastname}</p>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
