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

export { login, signUp }
