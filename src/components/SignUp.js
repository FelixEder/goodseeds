import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../store/actions/authActions';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const SignUp = ({signUp, authError}) => {
    const [credentials, setCredentials] = React.useState({name: "", email: "", password: ""});
    const classes = useStyles();
    const history = useHistory();
    
    function handleSubmit(event) {
        event.preventDefault();
        
        // Dispatch signup action
        signUp(credentials)

        // Navigate to user profile
        // history.push("/userProfile");
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
                    // ref={node => name = node}
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
                    // ref={node => email = node}
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
                    // ref={node => password = node}
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
              <Grid container justify="flex">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
                    {/* { authError ? <p>{ authError } </p> : null} */}
            { authError ? 
                (<Typography component="h1" variant="caption">
                    {authError}
                </Typography>)
            : null
            }
            </form>
          </div>
          <Box mt={5}>
          </Box>
        </Container>
      );
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
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