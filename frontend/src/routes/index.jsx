import { Routes, Route, Navigate } from 'react-router-dom'

import { PrivateRoutes } from './PrivateRoutes'

import { Layout } from '../shared/components/layout'

import {
  SignIn,
  SignUp,
  ForgotPasssword,
  ResetPasssword,
  Dashboard,
  Profile,
  Playlist,
  PlaylistDetails,
} from '../pages'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPasssword />} />
      <Route path="/reset-password/:token" element={<ResetPasssword />} />

      <Route element={<PrivateRoutes />}>
        <Route
          path="/home"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/playlist"
          element={
            <Layout>
              <Playlist />
            </Layout>
          }
        />

        <Route path="/playlist/details/:id" element={<PlaylistDetails />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
