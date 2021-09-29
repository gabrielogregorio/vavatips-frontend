import { createContext, useContext } from "react";

export type userInterface = {
  id: string,
  username: string
}

type UserContextType = {
  user: userInterface,
  setUser: (user: userInterface) => void
}

export const UserContext = createContext<UserContextType>(
  {
    user: {id: '', username: ''},
    setUser: user => console.log('You need apply context')
  }
)

export const useUser = () => useContext(UserContext)
