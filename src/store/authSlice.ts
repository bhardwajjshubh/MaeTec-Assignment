import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  token: string | null
  user: { username: string } | null
}

const initial: AuthState = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
}

const slice = createSlice({
  name: 'auth',
  initialState: initial,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: { username: string } }>){
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    logout(state){
      state.token = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})

export const { loginSuccess, logout } = slice.actions
export default slice.reducer
