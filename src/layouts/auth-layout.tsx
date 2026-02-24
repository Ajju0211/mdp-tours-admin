import { getProfile } from '@/api/auth/auth'
import { useAuthStore } from '@/store/adminAuth.store'
import React, { useEffect, useLayoutEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function AuthProfileLayout() {
  const { auth } = useAuthStore()
  const fetchUserProfile = async () => {
    const res = await getProfile()
    if (res.user) {
      console.log("Response: ", res)
      auth.setUser(res.user)
      auth.setIsAuthenticated(true);
    } else {
      auth.setIsAuthenticated(false)
    }
  }

  useLayoutEffect(() => {
    console.log("AUth: ", auth)
    if(!auth.isAuthenticated){
    fetchUserProfile()
    }
  }, [auth.isAuthenticated])
  
  
  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthProfileLayout