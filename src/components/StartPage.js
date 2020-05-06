import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getPlantDetails } from '../api/trefleApiCalls';
import Button from '@material-ui/core/Button';
import RenderPromise from '../util/RenderPromise'
import { useHistory } from 'react-router-dom';
import daysBetween from '../util/dateHandler.js'
import logo from '../logo.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const StartPage = ({plants, uid, users}) => {
  const history = useHistory();
  const classes = useStyles();


  const numPlantsNeedWatering = (users) => {
    if (!users || !uid) return null;

    return (users
          .filter(user => user.id == uid)[0].plants // Access users plants
          .filter(plant => (daysBetween(new Date(JSON.parse(plant).lastWatered), new Date()) > JSON.parse(plant).waterPeriod)).length)
  }

  const sortAvgRating = (a, b) => {
    if (a.avg_rating > b.avg_rating) {
      return -1
    } else if (b.avg_rating < a.avg_rating) {
      return 1
    }
    return 0
  }

  const generateRandomPlantandReview = () => {
    var potentialPlants = plants.filter(plant => (plant.reviews !== undefined && plant.reviews.length >= 0))
    var randomPlant = potentialPlants[Math.floor(Math.random()*potentialPlants.length)];
    var randomReview = JSON.parse(randomPlant.reviews[[Math.floor(Math.random()*randomPlant.reviews.length)]])
    return <RenderPromise promise={getPlantDetails(randomPlant.id)} renderData={({data}) => {return createReviewDisplay(data, randomReview)}}/>
  }

  const createReviewDisplay = (plantDetails, reviewDetails) => {
    return(<Grid item key={plantDetails} xs={12} sm={6} md={4}>
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={(plantDetails.images && plantDetails.images.length > 0) ? plantDetails.images[0].url : logo}
        title="review of plant"
        onClick={() => {history.push("/plantDetails/" + plantDetails.id)}}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {plantDetails.common_name ? plantDetails.common_name : plantDetails.scientific_name}
        </Typography>
        <Typography>
          {reviewDetails.reviewText}
        </Typography>
        <Typography variant="caption" display="block" align="right" gutterBottom>
          <i>
            {reviewDetails.username}
          </i>
        </Typography>
      </CardContent>
    </Card>
  </Grid>
    )
  }

  const createTopPlantDisplay = (plantDetails, reviewDetails) => {

    return (
    <Grid item key={plantDetails} xs={12} sm={6} md={4}>
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={(plantDetails.images && plantDetails.images.length > 0) ? plantDetails.images[0].url : logo}
        title="top plant display"
        onClick={() => {history.push("/plantDetails/" + plantDetails.id)}}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {plantDetails.common_name ? plantDetails.common_name : plantDetails.scientific_name}
        </Typography>
        <Typography>
          Average Rating: {reviewDetails.avg_rating.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
    </Grid>)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome to Goodseeds!
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              View some of our plants below, or go to your user profile to water your garden.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
             Top rated plants
            </Typography>

          {/* Top rated plants */}
          <Grid container spacing={4}>
          {plants ?
             plants.slice()             // Copy array
                   .sort(sortAvgRating) // Sort according to avg rating
                   .slice(0,3)          // Take first 3 elements
                   .map(plant => {
                     return (
                       <RenderPromise promise={getPlantDetails(plant.id)} renderData={({data}) => {return createTopPlantDisplay(data, plant)}}/>
                     )
                   })
           : null}
           </Grid>
           </Container>

          <Container className={classes.cardGrid} maxWidth="md">
          {/* Random Review */}
           <Typography variant="h5" align="center" color="textSecondary" paragraph>
             Random review
            </Typography>
          <Grid container spacing={4} justify="center">
          {
            plants ?
            generateRandomPlantandReview()
            : null
          }

          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        {!users || !uid
          ? <Typography variant="h6" align="center" gutterBottom>Log in or sign up to see your garden</Typography>
          : <Typography variant="h6" align="center" gutterBottom>Your garden has {numPlantsNeedWatering(users)} plants in need of watering!</Typography>
        }
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Go to your garden to water your plants!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    plants: state.firestore.ordered.Plants,
    uid: state.firebase.auth.uid,
    users: state.firestore.ordered.Users
  }
}

export default compose (

  firestoreConnect((props) => {
    return [{ collection: 'Plants' }, { collection: 'Users', doc: props.uid }];
  }),

  connect(mapStateToProps, null),
)(StartPage);
