import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import { Button, TextField, Typography } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';


const Payment = ({customerId}) => {

    const [success, setSuccess] = useState(false);
    const [accountId, setAccountId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [balance, setBalance] = useState('');
    const [currentBal, setCurrentBal] = useState('');
    const [rentalAmount, setRentalAmount] = useState('');
    const [loanNo, setLoanNo] = useState('');
    const [formData, setFormData] = useState({
        paymentAmount: '',
        loanNo: '',
        description: '',
    });
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    const token = localStorage.getItem("token");
    console.log(token);

  
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8181/api/v1/facility/loan/${customerId}`, {
                    method: "GET",
                    mode:"cors",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                  setSuccess(false);
                    setErrorMessage('Network response was not ok');
                } else {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse.data.loans);
                    setValue(jsonResponse.data.loans[0].loanNo);
                    setLoanNo(jsonResponse.data.loans[0].loanNo)
                    setRentalAmount(jsonResponse.data.loans[0].rentalAmount);
                    setAccountId(jsonResponse.data.account.accountIdPk);
                    setAccountNo(jsonResponse.data.account.accountNo);
                    setOptions(jsonResponse.data.loans)
                    setBalance(jsonResponse.data.account.availableBalance);
                    setCurrentBal(jsonResponse.data.account.currentBalance);
                    setErrorMessage('');
                }
            } catch (error) {
              setSuccess(false);
                setErrorMessage('Error fetching data');
            }
        };




    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name ==='loanNo') {
          setLoanNo(value);
        }
        if (name ==='loanNo') {
          setLoanNo(value);
        }

        setSuccess(false); 
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(token)
        const data = {
            paymentAmount: formData.paymentAmount,
            loanNo: formData.loanNo,
            description: formData.description,
            accountIdPk: accountId
        };

        console.log(data);

        try {
            const response = await fetch("http://localhost:8181/api/v1/payment", {
                method: "POST",
                mode:"cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse.error);
                if (jsonResponse.error.message !=='') {
                    setErrorMessage(jsonResponse.error.message);
                } else {
                    throw new Error("Network response was not ok");
                }
            } else {
                const jsonResponse = await response.json();
                console.log(jsonResponse.success)
                if (jsonResponse.success) {
                    setErrorMessage(''); 
                    console.log("Data sent successfully!");
                    setSuccess(true);
                    setFormData({ // clear the form data after successful submission
                        paymentAmount: '',
                        loanNo: '',
                        description: ''
                    });
                } else {
                    setErrorMessage(jsonResponse.error.message);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
      fetchData();
    }, [customerId]);



    return(
        <div>
          <form onSubmit={handleSubmit}>
          {accountNo !=='' && (
                        <Stack sx={{ width: '100%' }} spacing={2} alignContent="center">

                                <Alert severity="info">
                                  <AlertTitle>Account Details</AlertTitle>
                                  <span>Account No:</span>{accountNo} <br/>
                                  <span>Available Balance:</span>{balance} <br/>
                                  <span>Current Balance:</span>{currentBal} <br/>
                                  <span>Loan Number:</span>{loanNo} <br/>
                                  <span>Loan Rental:</span>{rentalAmount} <br/>
                                </Alert>
                                                        
                        
                        </Stack>
                        
                        
                    )}

            <Box display="flex" flexDirection={"column"} maxWidth={400}
                 alignItems="center" justifyContent={"center"} margin="auto"
                  marginTop={5} padding={3} borderRadius={5} boxShadow={"5px 5px 10px #ccc"} sx={{":hover": {
                    boxShadow:'10px 10px 20px #ccc'
                  }}}>
                    <Typography variant="h5" padding={3} textAlign="center">Payment</Typography>

               
                    {success && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                        
                            <Alert severity="success">Payment success!</Alert>
                        </Stack>
                    )}

                    {errorMessage !=='' && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                        
                            <Alert severity="error">{errorMessage}</Alert>
                        </Stack>
                    )}
                    <TextField type={'text'} margin="normal" name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} label="Loan Amount" variant="outlined" placeholder="Loan Amount"/>
      
        
                    <FormControl variant="outlined" style={{width: '200px'}}>
          <InputLabel id="loan-no-label">Loan No.</InputLabel>
          <Select
            labelId="loan-no-label"
            id="loan-no-select"
            value={formData.loanNo ==''? value:formData.loanNo}
            name="loanNo"
            onChange={handleChange}
            label="Loan No."
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.loanNo}>
                {option.loanNo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
                    <TextField type={'text'} margin="normal" name="description" value={formData.description} onChange={handleChange} label="Description" variant="outlined" placeholder="Description"/>
                          <Button type="submit" sx={
                         {
                            marginTop:3, borderRadius:3

                         }}
                         variant="contained"
                         color="warning"
                    > Pay</Button>
                    
                  

             </Box>

          </form>
        </div>
    );
}

export default Payment;