import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from "@mui/material";

const Transactions= ({customerId})=> {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8181/api/v1/payment/transaction/${customerId}`, {
          method: "GET",
          mode:"cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          
          setErrorMessage('Network response was not ok');
        } else {
          const jsonResponse = await response.json();
     
             setData(jsonResponse.data);
         
        }
      } catch (error) {
        setErrorMessage('Error fetching data');
       
      }
    };
  
    fetchData();
  }, [customerId]);

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  }
  
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'SGD' }).format(amount);
  }
  
  

  const columns = [
    { label: 'Transaction Date', field: 'date' },
    { label: 'Transaction Type', field: 'type' },
    { label: 'Transaction Amount', field: 'amount' },
  ];

  return (
    <div>
        <Box display="flex" flexDirection={"column"} maxWidth={700}
                 alignItems="center" justifyContent={"center"} margin="auto"
                  marginTop={5} padding={3} borderRadius={5} boxShadow={"5px 5px 10px #ccc"} sx={{":hover": {
                    boxShadow:'10px 10px 20px #ccc'
                  }}}>   
                    <Typography variant="h5" padding={3} textAlign="center">Transaction details</Typography>   
                        {errorMessage !=='' && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                        
                            <Alert severity="error">{errorMessage}</Alert>
                        </Stack>
                    )}

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.label}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
              <TableRow key={row.transactionIdPk} >
               <TableCell>{formatDateTime(row.transactionDate)}</TableCell>
               <TableCell>{row.transactionType}</TableCell>
               <TableCell>{formatCurrency(row.transactionAmount)}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </div>
  );
}

export default Transactions;