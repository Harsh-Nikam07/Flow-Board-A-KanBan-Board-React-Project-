import { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme';
import { BrowserRouter,  Routes, Route} from 'react-router-dom'
import AuthScreen from './screens/AuthScreens';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import useStore from './store';

const App = () => {

  const { loader, setLoginStatus  } =  useStore();

  console.log(loader)

  useEffect(() => {

    const unsub = onAuthStateChanged(auth, user => {
      setLoginStatus(!!user);
    })

    return () => unsub();
  }, []);

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