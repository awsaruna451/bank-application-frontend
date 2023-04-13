import React, { useState} from "react";
import FacilityRequest from './components/facility/FacilityRequest';
import Payment from './components/payment/Payment';
import Transactions from './components/payment/Transactions';
import Registration from './components/user/Registration';
import Login from './components/user/Login';
import { BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom';

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [customerId, setCustomerId] = useState('');



  const handleLogout = () => {
    setLoggedIn(false);
    setCustomerId('');

  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Abc Bank Application
            </Typography>
            {!loggedIn && (
              <Button component={Link} to="/" color="inherit">
                Login
              </Button>
            )}
            {!loggedIn && (
              <Button component={Link} to="/registration" color="inherit">
                Account Creation
              </Button>
            )}
            {loggedIn && (
              <Button component={Link} to="/loan" color="inherit">
                Personal Loan
              </Button>
            )}
            {loggedIn && (
              <Button component={Link} to="/payment" color="inherit">
                Payment
              </Button>
            )}
            {loggedIn && (
              <Button component={Link} to="/transaction" color="inherit">
                Transactions
              </Button>
            )}

            {loggedIn && (
              <Button onClick={handleLogout} component={Link} to="/" color="inherit">
                Logout
              </Button>
            )}   
          </Toolbar>
        </AppBar>
        <Routes>
          {!loggedIn && (
            <Route
              path="/"
              element={<Login setLoggedIn={setLoggedIn} setCustomerId={setCustomerId}  />}
            />
          )}
          {!loggedIn && (
            <Route path="/registration" element={<Registration />} />
          )}
          {loggedIn && (
            <Route path="/loan" element={<FacilityRequest customerId={customerId} />}>
              {" "}
            </Route>
          )}
          {loggedIn && <Route path="/payment" element={<Payment customerId={customerId} />} />}
          {loggedIn && (
            <Route path="/transaction" element={<Transactions customerId={customerId} />} />
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
