import { Routes, Route, Navigate } from 'react-router-dom'

import { SignIn, SignUp } from '../pages'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
