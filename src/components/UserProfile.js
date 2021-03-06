import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getPlantDetails } from '../api/trefleApiCalls';
import RenderPromise from '../util/RenderPromise'
import logo from '../logo.png';
import { waterPlant, updateWaterPeriod, removePlant } from '../store/actions/plantActions';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from '../util/styleHandler';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import daysBetween from '../util/dateHandler';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import OpacityIcon from '@material-ui/icons/Opacity';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserProfile = ({uid, user, waterPlant, updateWaterPeriod, removePlant}) => {
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState("")

  const handleChange = (event, plantID) => {
    if (event) {
      updateWaterPeriod({userID: uid, plantID, waterPeriod: event.target.value})
      setMessage("Updated water period!")
      setOpen(true)
    }


  };

  const handleDelete = (plantID) => {
    removePlant({userID: uid, plantID})
    setMessage("Deleted plant!")
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const classes = useStyles();

  // Takes in plantID, fetches information about plant and returns image and name
  const createPlantDisplay = (genericPlant, userPlant) => {

  return (<Card className={(daysBetween(new Date(userPlant.lastWatered), new Date()) >= userPlant.waterPeriod) ? classes.cardPlantNeedsWater : classes.card} key={userPlant.id}>
    <CardMedia
      className={classes.cardMedia}
      image={(genericPlant.images && genericPlant.images.length > 0) ? genericPlant.images[0].url : logo}
      title={userPlant.scientific_name}
      onClick={() => {history.push("/plantDetails/" + genericPlant.id)}} />
    <CardContent className={classes.cardContent}>

      <Typography gutterBottom variant="h5" component="h2">
      {genericPlant.common_name}
      </Typography>

      
      {userPlant.lastWatered ? 
        <Typography>Last watered {daysBetween(new Date(userPlant.lastWatered), new Date())} days ago </Typography>
      : <Typography>You haven't watered this plant yet</Typography>}
      

      {userPlant.waterPeriod
          ?
          <Typography><i>Needs to be watered every {userPlant.waterPeriod} days</i></Typography>
          :
          <Typography><i className='blinking'>You need to set how often this plant needs to be watered below</i></Typography>
      }

    </CardContent>
    <CardActions>
      <IconButton justify="left" aria-label="water plant" color="secondary" onClick={(() => {
                                                            waterPlant({userID: uid, plantID: userPlant.id})
                                                            setMessage("Watered plant!")
                                                            setOpen(true)
                                                            })}>
        <OpacityIcon />
      </IconButton>
        <FormControl className={classes.formControl}>
        <InputLabel>Water period</InputLabel>
        <Select
          value={userPlant.waterPeriod ? userPlant.waterPeriod : 0}
          onChange={(event) => handleChange(event, userPlant.id)}
          justify="center"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
      <IconButton color="secondary" aria-label="delete plant" component="span" justify="right" onClick={(() => {if (window.confirm('Are you sure you want to delete this plant?')) handleDelete(userPlant.id)})}>
          <DeleteIcon />
      </IconButton>
    </CardActions>
  </Card>)
  }

  // If no user is logged in, return to start page
  if (!uid) {
    history.push("/");
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Your garden
            </Typography>
            {user && user[0] && user[0].plants ?
              user[0].plants.length > 0 ?
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Water your plants below!
             </Typography>
                  : <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    You have no plants in your garden! Add them by searching for new plants
                    </Typography>
              : null
            }
            
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            { user ? 
                user[0].plants.map((plant) => (
                  <Grid item key={plant} xs={12} sm={6} md={4}>
                    <RenderPromise promise={getPlantDetails(JSON.parse(plant).id)} renderData={({data}) => {return createPlantDisplay(data, JSON.parse(plant))}} setNull={false} />
                  </Grid>
                ))
                  : null
            }

          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {message}
            </Alert>
          </Snackbar>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          This is the end of your garden
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Search for plants to expand your garden!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );

}

const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
    user: state.firestore.ordered.Users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      waterPlant: waterAction => dispatch(waterPlant(waterAction)),
      updateWaterPeriod: action => dispatch(updateWaterPeriod(action)),
      removePlant: action => dispatch(removePlant(action))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    if (!props.uid) return [];
    return [{ collection: 'Users', doc: props.uid }];
  }),
)(UserProfile);
