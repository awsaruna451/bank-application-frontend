import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Button, TextField, Typography } from "@mui/material";

const Payment = () => {

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        paymentAmount: '',
        loanNo: '',
        description: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setSuccess(false); 
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          paymentAmount: formData.paymentAmount,
          loanNo: formData.loanNo,
          description: formData.description,
          accountIdPk: 1
        };

        console.log(data);
    
      try {
          const response = await fetch("http://localhost:8181/api/v1/payment", {
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
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
        // Submit form data here
    }, [formData]);



    return(
        <div>
          <form onSubmit={handleSubmit}>
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
                    <TextField type={'text'} margin="normal" name="loanNo" value={formData.loanNo} onChange={handleChange} label="Loan Reference Number" variant="outlined" placeholder="Loan Reference Number"/>
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