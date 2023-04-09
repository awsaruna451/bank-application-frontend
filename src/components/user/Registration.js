import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';

import { Button, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



const Registration = () => {
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        fin: '',
        dateOfBirth: '',
        gender: '',
        civilStatus: '',
        address1: '',
        address2: '',
        mobileNumber: '',
        userName: '',
        email: '',
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
          email: formData.email,
          password: formData.password,
          customerType: "CUSTOMER",
          branchId: "test-branch",
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            idNo: formData.fin,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            civilStatus: formData.civilStatus,
            mobileNumber: formData.mobileNumber,
            address1: formData.address1,
            address2: formData.address2
          }
        };

        console.log(data);
    
      try {
          const response = await fetch("http://localhost:8181/api/v1/user", {
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
            console.log(response.success)
            console.log("Data sent successfully!");
            setSuccess(true);
            setFormData({ // clear the form data after successful submission
                userName: "",
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                fin: "",
                dateOfBirth: "",
                gender: "",
                civilStatus: "",
                address1: "",
                address2: "",
                mobileNumber:""
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
        
                    <Typography variant="h5" padding={3} textAlign="center">Account Creation</Typography>
                    {success && (
            <Stack sx={{ width: '100%' }} spacing={2}>
               
                <Alert severity="success">Account successfully created!</Alert>
            </Stack>
           )}
                    <div>
                    <div>
                    <TextField type={'text'} margin="normal" label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} variant="outlined" placeholder="First Name"/>
                    <TextField type={'text'} margin="normal"  label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} variant="outlined" placeholder="Last Name"/>
                    </div>
            
                    <div>
                    <TextField type={'text'} margin="normal" name="gender" value={formData.gender} onChange={handleChange}  variant="outlined" placeholder="Gender"/>
                    <TextField type={'text'} margin="normal" name="civilStatus" value={formData.civilStatus} onChange={handleChange}   variant="outlined" placeholder="Civil Status"/>
                    </div>
                    <div>
                    <TextField type={'text'} margin="normal"  name="address1"  value={formData.address1} onChange={handleChange}  variant="outlined" placeholder="Address 1"/>
                    <TextField type={'text'} margin="normal" name="address2"  value={formData.address2} onChange={handleChange}  variant="outlined" placeholder="Address 2"/>
                    </div>
                    <div>
                    <TextField type={'text'} margin="normal" name="fin" value={formData.fin} onChange={handleChange}  variant="outlined" placeholder="FIN"/>
                    <TextField type={'text'} margin="normal" label="Date Of Birth"  name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}  variant="outlined" placeholder="YYYY-MM-DD"/>
                    </div>
                    <div>
                    <TextField type={'text'} margin="normal" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange}  variant="outlined" placeholder="Mobile Number"/>
                    </div>
             
                    </div>

                    <div>
               
                    <TextField type={'text'} name="userName" value={formData.userName} onChange={handleChange}  margin="normal"  variant="outlined" placeholder="User Name"/>
                    <TextField type={'email'} name="email" value={formData.email} onChange={handleChange} margin="normal" label="Email"  variant="outlined" placeholder="Email"/>
                    <TextField type={'password'} name="password" value={formData.password} onChange={handleChange} margin="normal"  variant="outlined" placeholder="Password"/>
                    </div>
                  
                   
                    <Button type="submit" sx={
                         {
                            marginTop:3, borderRadius:3

                         }}
                         variant="contained"
                         color="warning"
                    > Button</Button>

                </Box>
            </form>
         </div>
    );

}

export default Registration;