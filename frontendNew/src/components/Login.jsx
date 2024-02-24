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

export default function Login() {
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
    } catch (err) {
      console.error(err);
    }
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div className="container-fluid bg-gradient-to-r from-slate-900 to-slate-700 p-[3vw]">
      <Container component="main" maxWidth="xm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="text-center w-inline text-3xl font-bold text-white py-2 rounded mt-[20vh] mb-5">
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
