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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getUserDetails, insertUserDetails } from "../firebase/firestore";

const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = async function(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    try {
      const registeredUser = await createUserWithEmailAndPassword(auth, email, password)
      await insertUserDetails({
        user_id: registeredUser.user.uid,
        role: "Chairman"
      });
      // store the newly created user with roles as well
      console.log("New person is registered!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <ThemeProvider theme={defaultTheme}>
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
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    color="secondary"
                    style={{
                      backgroundColor: "#0074f0",
                    }}
                    InputProps={{
                      style: {
                        color: "black",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    color="secondary"
                    autoComplete="new-password"
                    style={{
                      backgroundColor: "#0074f0",
                    }}
                    InputProps={{
                      style: {
                        color: "black",
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid
                  item
                  sx={{ textDecoration: "underline", fontStyle: "italic" }}
                >
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
