import Image from 'next/image'
import Login from './login/page'
import { UserProvider } from './components/context/UserContext'

export default function Home() {
  return (
      <>

        <Login/>
      
      </>
  )
}
