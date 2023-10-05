import { AuthProvider } from './auth'
import { ToastProvider } from './Toast'

const AppProvider = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)

export { AppProvider }
