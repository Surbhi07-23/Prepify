import './App.css'
import {Show,  SignInButton, SignOutButton, UserButton } from '@clerk/react'

function App() {
  return (
    <>
      <h1>Welcome to prepify</h1>
      <Show when="signed-out">
        <SignInButton mode='modal'/>
        <button>Login</button>
      </Show>
      
      <Show when="signed-in">
        <UserButton />
        <SignOutButton />
      </Show>
    </>
  )
}

export default App
