import './App.css';
import FacilityRequest from './components/facility/FacilityRequest';
import Payment from './components/payment/Payment';
import Transactions from './components/payment/Transactions';
import Registration from './components/user/Registration';
import Login from './components/user/Login';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});



function App() {
  return (

     <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Abc Bank Application
            </Typography>
            <Button component={Link} to="/" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/registration" color="inherit">
              Registration
            </Button>
            <Button component={Link} to="/loan" color="inherit">
              Personal Loan
            </Button>
            <Button component={Link} to="/payment" color="inherit">
              Payment
            </Button>
       
            <Button component={Link} to="/transaction" color="inherit">
              Transactions
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/registration' element={<Registration/>} />
      <Route path='/loan' element={<FacilityRequest/>}> 
      </Route>
      <Route path='/payment' element={<Payment/>} />
      <Route path='/transaction' element={<Transactions/>} />
    </Routes>
    </Router>   
    </ThemeProvider>
     
  );
}

export default App;
