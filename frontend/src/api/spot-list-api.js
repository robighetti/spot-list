import { api } from '../shared/services'

/**
 *
 * @param {*} params (email, password)
 * @description: Chamada a API para login
 */
const login = async (params) => {
  try {
    const result = await api.post('/login', params)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 *
 * @param {*} params (name, email, password)
 * @description: Chamada a API para cadastro
 */
const signUp = async (params) => {
  try {
    const result = await api.post('/users', params)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para esqueci minha senha
 * @param {*} params (email)
 */
const forgotPassword = async (params) => {
  try {
    const result = await api.post('/users/forgot-password', params)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * @description: Chamada a API para resetar a senha
 * @param {*} params (password, token)
 */
const resetPassword = async (params) => {
  try {
    const result = await api.patch(`/users/reset-password/${params.token}`, {
      password: params.password,
    })

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

const uploadImage = async (avatar) => {
  try {
    const result = await api.patch('users/avatar', avatar)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

const updateUserData = async (userData) => {
  try {
    const result = await api.put(`/users/${userData.id}`, userData)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

const getTracks = async (params) => {
  try {
    const queryString = `${params.query}=${params.value}`

    const result = await api.get(`/lists/tracks?${queryString}`)

    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export {
  login,
  signUp,
  forgotPassword,
  resetPassword,
  uploadImage,
  updateUserData,
  getTracks,
}
