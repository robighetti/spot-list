import { createContext, useCallback, useContext } from 'react'

import { toast, ToastContainer } from 'react-toastify'

import { v4 as uuid } from 'uuid'

import {
  FiXCircle,
  FiCheckCircle,
  FiAlertTriangle,
  FiInfo,
} from 'react-icons/fi'

const ToastContext = createContext({})

const ToastProvider = ({ children }) => {
  const addToast = useCallback((message) => {
    const { type, title, description } = message

    const Message = () => (
      <div>
        <strong>{title}</strong>
        {description && <span>{description}</span>}
      </div>
    )

    const icons = {
      error: <FiXCircle color="#c53030" />,
      success: <FiCheckCircle color="#2e656a" />,
      warning: <FiAlertTriangle color="#f2e205" />,
      info: <FiInfo color="#3172b7" />,
    }

    toast[type](<Message />, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: uuid(),
      icon: icons[type],
    })
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer autoClose={3000} />
    </ToastContext.Provider>
  )
}

function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
