import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getUserDetails, insertUserDetails } from "../firebase/firestore";

export default function SignUp() {
  const handleSubmit = async function (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    try {
      const registeredUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await insertUserDetails({
        user_id: registeredUser.user.uid,
        role: "Chairman",
      });
      // store the newly created user with roles as well
      console.log("New person is registered!");
    } catch (err) {
      console.error(err);
    }
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
            <h3>Sign Up</h3>
          </div>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 1, alignItems: "center" }}
          >
            <TextField
              variant="filled"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              color="secondary"
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
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              color="secondary"
              autoComplete="new-password"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid
                item
                sx={{ textDecoration: "underline", fontStyle: "italic" }}
              >
                <Link to="/login" variant="body2">
                  Already have an account? Login!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
