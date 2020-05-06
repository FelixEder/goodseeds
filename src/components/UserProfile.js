import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getPlantDetails } from '../api/trefleApiCalls';
import RenderPromise from '../util/RenderPromise'
import logo from '../logo.png';
import { waterPlant, updateWaterPeriod } from '../store/actions/plantActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import daysBetween from '../util/dateHandler';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardPlantNeedsWater: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border : '2px red solid'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardNeedsWater: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: '2px red solid'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const UserProfile = ({uid, user, waterPlant, updateWaterPeriod}) => {

  const handleChange = (event, plantID) => {
    if (event) {
      updateWaterPeriod({userID: uid, plantID, waterPeriod: event.target.value})
    }

  };

  const history = useHistory();
  const classes = useStyles();

  // Takes in plantID, fetches information about plant and returns image and name
  const createPlantDisplay = (genericPlant, userPlant) => {

  return (<Card className={(daysBetween(new Date(userPlant.lastWatered), new Date()) >= userPlant.waterPeriod) ? classes.cardPlantNeedsWater : classes.card}>
    <CardMedia
      className={classes.cardMedia}
      image={(genericPlant.images && genericPlant.images.length > 0) ? genericPlant.images[0].url : logo}
      title="Image title"
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
      <Button size="small" color="primary" onClick={(() => waterPlant({userID: uid, plantID: userPlant.id}))}>
        Water
      </Button>
        <FormControl className={classes.formControl}>
        <InputLabel>Water period</InputLabel>
        <Select
          value={userPlant.waterPeriod ? userPlant.waterPeriod : 0}
          onChange={(event) => handleChange(event, userPlant.id)}
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
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Water your plants below!
            </Typography>
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
            : null }

          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
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
      updateWaterPeriod: action => dispatch(updateWaterPeriod(action))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    if (!props.uid) return [];
    return [{ collection: 'Users', doc: props.uid }];
  }),
)(UserProfile);
