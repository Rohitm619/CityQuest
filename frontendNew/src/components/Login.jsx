import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getUserDetails } from "../firebase/firestore";
import Alert from "@mui/material/Alert";

export default function Login() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const signedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDetails = await getUserDetails(signedInUser.user.uid);
      console.log("User is signed in", userDetails);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (err) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div className="container-fluid bg-gradient-to-r from-slate-900 to-slate-700 p-[8vw]">
      <Container component="main" maxWidth="xm" className="mb-5">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="mt-[5vh] mb-3 fixed right-10 top-20">
            {showSuccessAlert ? (
              <Alert variant="filled" severity="success">
                User Signed in!
              </Alert>
            ) : (
              ""
            )}

            {showErrorAlert ? (
              <Alert variant="filled" severity="error">
                Invalid Credentials
              </Alert>
            ) : (
              ""
            )}
          </div>
          <div className="text-center w-inline text-3xl font-bold text-white pb-2 rounded pb-5">
            <h3>Login</h3>
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 1, alignItems: "center" }}
          >
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              style={{
                backgroundColor: "black",
                border: "1px solid White",
                borderRadius: "5px",
              }}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              style={{
                backgroundColor: "black",
                borderRadius: "5px",
                border: "1px solid White",
              }}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid
                item
                sx={{ textDecoration: "underline", fontStyle: "italic" }}
              >
                <Link to="/signup" variant="body2">
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
