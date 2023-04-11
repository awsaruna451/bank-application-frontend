import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';

import { Button, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



const Login = () => {
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setSuccess(false); 
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          userName: formData.userName,
          password: formData.password
          }
        

        console.log(data);
    
      try {
          const response = await fetch("http://localhost:8181/api/v1/user/authenticate", {
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
              
            },
            body: JSON.stringify(data)
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          } else {
            const jsonResponse = await response.json();
            console.log(jsonResponse.success)
            setSuccess(true);
            setFormData({ // clear the form data after successful submission
                userName: "",
                password: ""
              });
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
        
                    <TextField type={'text'} name="userName" label="User name"  value={formData.userName} onChange={handleChange}  margin="normal"  variant="outlined" placeholder="User Name"/>
                
                    <TextField type={'password'} name="password" label="Password" value={formData.password} onChange={handleChange} margin="normal"  variant="outlined" placeholder="Password"/>
                  
                  
                   
                    <Button type="submit" sx={
                         {
                            marginTop:3, borderRadius:3

                         }}
                         variant="contained"
                         color="warning"
                    > Login</Button>

                </Box>
            </form>
         </div>
    );

}

export default Login;