import { api } from '../axios'

interface SignupResponse {
  user?: {
    email: string
    role: string
  }
}

/**
 * Signup a new admin user
 * @param email - Admin email
 * @param password - Admin password
 * @returns SignupResponse
 */
export async function signUp(email: string, password: string): Promise<SignupResponse> {
  try {
    // const response = await api.post<SignupResponse>('/auth/sign-up', {
    //   email, // fixed typo from `emai`
    //   password,
    // })
    const response = new Promise(() => {
      return {
        user: {
          email: "[EMAIL_ADDRESS]",
          role: "admin"
        }
      }
    })
    const res = await response as SignupResponse
    console.log("response ", res)
    return res
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Signup failed')
    } else {
      throw new Error(error.message || 'Signup failed')
    }
  }
}

/**
 * Signin admin 
 * @param email - Admin email
 * @param password -Admin password
 * @returns SinginResponse
 */

export async function signIn(email: string, password: string): Promise<SignupResponse> {
  try {
    const response = await api.post<SignupResponse>('/auth/sign-in', {
      email, // fixed typo from `emai`
      password,
    })

    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Signup failed')
    } else {
      throw new Error(error.message || 'Signup failed')
    }
  }
}

export async function getProfile(): Promise<SignupResponse> {
  try {
    const response = await api.get<SignupResponse>('/auth/profile')

    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Signup failed')
    } else {
      throw new Error(error.message || 'Signup failed')
    }
  }
}

interface SignOutResponse {
  success: boolean
  message: string
}

/**
 * Signout admin
 * @returns SignOutResponse
 */
export async function signOut(): Promise<SignOutResponse> {
  try {
    const response = await api.post<SignOutResponse>('/auth/sign-out')
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Signout failed')
    } else {
      throw new Error(error.message || 'Signout failed')
    }
  }
}