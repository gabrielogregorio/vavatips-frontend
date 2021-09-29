/*
Gerencia o token JWT do Backend
*/
export const TOKEN_JWT = 'app-token-valorant'
export const TOKEN_ID = 'app-id-valorant'

export const isAutenticate = () => localStorage.getItem(TOKEN_JWT) !== null && localStorage.getItem(TOKEN_JWT) !== undefined && localStorage.getItem(TOKEN_JWT) !== 'undefined'

export const getToken = () => localStorage.getItem(TOKEN_JWT)
export const getId = () => localStorage.getItem(TOKEN_ID  )

export const login = (token: string, id: string) => {
  localStorage.setItem(TOKEN_JWT, token)
  localStorage.setItem(TOKEN_ID, id)
}

export const logout = () => {
  localStorage.removeItem(TOKEN_JWT)
}
