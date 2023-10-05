import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import baseTheme from './styles/themes/baseTheme'

import { AppRoutes } from './routes'
import { AppProvider } from './shared/hooks'

import 'react-toastify/dist/ReactToastify.css'

import GlobalStyles from './styles/global-styles'

export const App = () => {
  return (
    <>
      <ThemeProvider theme={baseTheme}>
        <AppProvider>
          <GlobalStyles />

          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </>
  )
}
