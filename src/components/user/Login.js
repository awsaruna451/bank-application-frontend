import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';

import { Button, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedIn, setCustomerId}) => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });

    const navigate = useNavigate();
  

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
          userName: formData.userName,
          password: formData.password
        };

        try {
          const response = await fetch("http://localhost:8181/api/v1/user/authenticate", {
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json"
           
            },
            body: JSON.stringify(data)
          });
              
          if (!response.ok) {
            setSuccess(false);
           // throw new Error("Network response was not ok");
            setErrorMessage('Username or password is invalid!!!!');


          } else {
            const jsonResponse = await response.json();

            console.log(jsonResponse.success);
            if (jsonResponse.success) {

            // Store the JWT token in local storage
            localStorage.setItem("token", jsonResponse.data.access_token);
            console.log(jsonResponse.data.access_token);

            setSuccess(true);
            setFormData({ // clear the form data after successful submission
                userName: "",
                password: ""
              });
              setCustomerId(jsonResponse.data.customerId);
            // Set the logged in state to true
            setLoggedIn(true);
            setErrorMessage('');
            navigate('/loan');
           
            }
            else {
                setSuccess(false);
                setErrorMessage(jsonResponse.error.message);
            }
          }

          console.log("Data sent successfully!");
        } catch (error) {
          console.error("Error:", error);
        }
    };

    useEffect(() => {
        // Submit form data here
    }, [formData]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection={"column"} maxWidth={400}
                 alignItems="center" justifyContent={"center"} margin="auto"
                  marginTop={5} padding={3} borderRadius={5} boxShadow={"5px 5px 10px #ccc"} sx={{":hover": {
                    boxShadow:'10px 10px 20px #ccc'
                  }}}>
                    <Typography variant="h5" padding={3} textAlign="center">Login</Typography>

                    {success && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="success">Login is success!</Alert>
                        </Stack>
                    )}
                        {errorMessage !=='' && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                        
                            <Alert severity="error">{errorMessage}</Alert>
                        </Stack>
                    )}

                    <TextField type={'text'} name="userName" label="User name"  value={formData.userName} onChange={handleChange}  margin="normal"  variant="outlined" placeholder="User Name"/>
                    <TextField type={'password'} name="password" label="Password" value={formData.password} onChange={handleChange} margin="normal"  variant="outlined" placeholder="Password"/>
                    <Button type="submit" sx={{ marginTop:3, borderRadius:3 }} variant="contained" color="warning"> Login</Button>
                </Box>
            </form>
        </div>
    );
};

export default Login;
