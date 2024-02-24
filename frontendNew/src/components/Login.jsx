import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getUserDetails } from "../firebase/firestore";

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    try {
      const signedInUser = await signInWithEmailAndPassword(auth, email, password);
      const userDetails = await getUserDetails(signedInUser.user.uid);
      console.log("User is signed in", userDetails);
    } catch (err) {
      console.error(err);
    }
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div className="login-container">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "black" }}>
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, margin: "5px" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              color="secondary"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              style={{
                backgroundColor: "#0074f0",
              }}
              InputProps={{
                style: {
                  color: "black",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              color="secondary"
              autoComplete="current-password"
              style={{
                backgroundColor: "#0074f0",
              }}
              InputProps={{
                style: {
                  color: "black",
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
