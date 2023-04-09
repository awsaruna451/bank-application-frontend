import './App.css';
import FacilityRequest from './components/facility/FacilityRequest';
import Payment from './components/payment/Payment';
import Transactions from './components/payment/Transactions';
import Registration from './components/user/Registration';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Registration/>} />
      <Route path='/loan' element={<FacilityRequest/>}> 
      </Route>
      <Route path='/payment' element={<Payment/>} />
      <Route path='/transaction' element={<Transactions/>} />
    </Routes>
   
    </BrowserRouter>
   
  );
}

export default App;
