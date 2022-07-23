import {
   Avatar,
   Box,
   Button,
   CircularProgress,
   Container,
   CssBaseline,
   Link,
   TextField,
   Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import { IoLockOpenOutline } from "react-icons/io5";
import { config } from "../../config"
import styles from "./Login.module.scss";

function Copyright() {
   return (
      <Typography variant="body2" color="textSecondary" align="center">
         {'Copyright © '}
         <Link color="inherit" href="https://material-ui.com/">
            Your Website
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}

export default function SignIn({ updateUserInfo }) {
   const [submitting, setSubmitting] = useState(false);
   const [errorMsg, setErrorMsg] = useState("");
   const [loading, setLoading] = useState(true);
   const [csrfmiddlewaretoken, setCsrfmiddlewaretoken] = useState("");

   let history = useHistory();
   let location = useLocation();

   useEffect(() => {
      var url = `${config.base_url}/auth/login`;
      (loading) && fetch(url, {
         method: 'GET',
         credentials: config.credentials,
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
      })
         .then(response => {
            if (!response.ok) {
               return {};
            } else {
               return response.json();
            }
         }).then(res => {
            if ('csrfmiddlewaretoken' in res) {
               setCsrfmiddlewaretoken(res['csrfmiddlewaretoken'])
            }
            setLoading(false);
         }).catch((error) => {
            console.error('Something went wrong with connection!:', error);
            setLoading(false);
         });
   }, [loading]);

   function handleSubmit(event) {
      event.preventDefault();
      setSubmitting(true);
      setErrorMsg("");

      const formData = new FormData(event.target);
      formData.append('csrfmiddlewaretoken', csrfmiddlewaretoken);

      var loginSuccess = false;
      var submitFailedTemp = false;
      var url = `${config.base_url}/auth/login`;
      fetch(url, {
         headers: {
            'Accept': 'application/json'
         },
         method: 'POST',
         credentials: config.credentials,
         body: formData
      }).then(response => {
         if (!response.ok) {
            submitFailedTemp = true;
            return {};
         }
         return response.json();
      }).then(data => {
         var errorMsg = "";
         if (submitFailedTemp) {
            errorMsg = "Failed to authenticate, try again!";
         }
         if ("success" in data) {
            if (!data["success"]) {
               errorMsg = data["error"];
            } else {
               loginSuccess = true;
               updateUserInfo(data["user_detail"]);
            }
         }
         else {
            errorMsg = "Login attempt failed, try again!";
         }
         setErrorMsg(errorMsg);
         setSubmitting(false);
         if (loginSuccess) {
            let { from } = location.state || { from: { pathname: "/" } };
            history.push(from);
         }
      });
   }

   return (
      <div className={styles.wrapper}>
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={styles.paper}>
            <Avatar className={styles.avatar}>
               <IoLockOpenOutline/>
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign in
            </Typography>
            <form className={styles.form} noValidate onSubmit={handleSubmit}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  error={errorMsg.trim() !== ""}
               />
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={errorMsg.trim() !== ""}
               />
               <Typography color="error">
                  {errorMsg}
               </Typography>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={styles.submit}
               >
                  Sign In
               </Button>
            </form>
            
      {(loading || submitting) && <CircularProgress size={68} className={styles.fabProgress} />}
         </div>
         <Box mt={8}>
            <Copyright />
         </Box>
         
      </Container>
      </div>
   );
}