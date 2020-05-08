import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../store/actions/authActions';
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


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp = ({signUp, authError, uid}) => {
    const [credentials, setCredentials] = React.useState({name: "", email: "", password: ""});
    const [open, setOpen] = React.useState(false)
    const classes = useStyles();
    const history = useHistory();
    
    function handleClose() {
      setOpen(false);
    };

    function handleSubmit(event) {
        event.preventDefault();
        
        // Dispatch signup action
        signUp(credentials)

        // If error, open snackbar
        if (authError) setOpen(true)

    }

    // Navigate to user profile if logged in
    if (uid) {
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
              Sign up to Goodseeds
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    onChange={(event) => setCredentials({...credentials, name: event.target.value})}
                    autoFocus
                  />
                </Grid>
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
                onClick={handleSubmit}
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                <Button color="primary" onClick={(() => history.push("/login"))}>
                    Already have an account? Sign in
                  </Button>
                </Grid>
              </Grid>
                    {/* { authError ? <p>{ authError } </p> : null} */}

            </form>
          </div>
          <Box mt={5}>
          </Box>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
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
        signUp: newUser => dispatch(signUp(newUser))
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)