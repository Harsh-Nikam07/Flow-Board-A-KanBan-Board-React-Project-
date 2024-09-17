import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme';
import { BrowserRouter,  Routes, Route} from 'react-router-dom'
import AuthScreen from './screens/AuthScreens';

const App = () => {
  return (
  
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AuthScreen />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    
    
  )
}

export default App