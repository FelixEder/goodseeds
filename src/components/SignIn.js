import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../store/actions/authActions';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from '../util/styleHandler';



const SignIn = ({ signIn, authError, uid }) => {

    const [credentials, setCredentials] = React.useState({email: "", password: ""})
    const [open, setOpen] = React.useState(false)
    const history = useHistory();
    const classes = useStyles();

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function handleClose() {
      setOpen(false);
    };
    
    function handleSubmit(event) {

        event.preventDefault();

        // Dispatch signin with values from input field
        signIn(credentials)

        // If error, open snackbar
        if (authError) {
          console.log(authError)
          setOpen(true)
        }
    }

    // Navigate to user profile if logged in
    if(uid) {
      history.push("/userProfile");
    }
    
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in to Goodseeds
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={(event) => setCredentials({...credentials, email: event.target.value})}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(event) => setCredentials({...credentials, password: event.target.value})}
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={(event) => handleSubmit(event)}
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Button color="primary" onClick={(() => history.push("/signup"))}>
                    Don't have an account? Sign up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
          </Box>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="error">
              {authError}
            </Alert>
          </Snackbar>
        </Container>
      );
}


const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        uid: state.firebase.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: creds => dispatch(signIn(creds))
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
