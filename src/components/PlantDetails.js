import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import { getPlantDetails } from '../api/trefleApiCalls';
import RenderPromise from '../util/RenderPromise';
import { addPlant } from '../store/actions/plantActions';
import { addReview } from '../store/actions/reviewActions'
import logo from '../logo.png';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import App from '../App.css';

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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    variant: "outlined",
    border : '2px green solid'
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
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const PlantDetails = ({uid, user, plants, addPlant, addReview}) => {
  let {id} = useParams();
  const [detailsPromise, setDetailsPromise] = useState(getPlantDetails(id));
  const classes = useStyles();

  useEffect(() => {
    setDetailsPromise(getPlantDetails(id))
  }, [id]);

  const plantReviews = plants ? plants : null;
  const createPlantDisplay = plantDetails => {
    return (
      <div className='plant-details'>
        <List className= {classes.list}>
          <ListItem media>
            <span className='plant-image'>
              <img src={plantDetails.images.length > 0 ? plantDetails.images[0].url : logo} width='500px' />
              <div>
                {plantDetails.scientific_name}
              </div>
              <div>
                {!uid
                  ? "Sign up or Log in to add this plant to your garden"
                  : <Button variant="contained" color="primary" onClick={() => addPlant({userID: uid, plantID: plantDetails.id})} disabled={user ? user[0].plants.some(plant => (JSON.parse(plant).id === plantDetails.id)) : false}>Add to my garden</Button>}
              </div>
            </span>
          </ListItem>
          <div>
            <ListItem text>
              <div>
                <b>Common name: </b> {plantDetails.common_name}
              </div>
            </ListItem>
            <ListItem text>
              <div>
                <b>Family common name: </b> {plantDetails.family_common_name}
              </div>
            </ListItem>
            <ListItem text>
              <div>
                <b>Scientific name: </b> {plantDetails.scientific_name}
              </div>
            </ListItem>
            <ListItem text>
              <div>
                <b>Duration: </b>  {plantDetails.duration}
              </div>
            </ListItem>
            <ListItem text>
              <div>
                <b>Fire resistance: </b>  {plantDetails.main_species.specifications.fire_resistance}
              </div>
            </ListItem>
            <ListItem>
              <div>
                <b>Native status: </b>  {plantDetails.native_status}
              </div>
            </ListItem>
          </div>
        </List>
      </div>
    )
  }

  return (<div>
    <RenderPromise promise={detailsPromise} renderData={({data}) => (<span>{createPlantDisplay(data)} </span>)} setNull={true} />
    {!uid
      ? 'Sign up or login in to add a review to this plant'
      :  <AddReviewComponent user={user} addReview={addReview}/>
    }
    {
      plantReviews
      ? (<div className='plant-reviews'>
          <h3>Reviews</h3>
          <Grid item key={plantReviews} xs={1} sm={1} md={4} alignContent="center" alignItems="center">
          { plantReviews.find(plant => plant.id === id) ? plantReviews.find(plant => plant.id === id).reviews.map(review => (<div className='plant-review'>
              <Card className={classes.card}>
                <CardHeader title={JSON.parse(review).username + " rated it " + JSON.parse(review).rating}/>
                <CardContent className={classes.cardContent}>
                  {JSON.parse(review).reviewText}<br/><br/>
                Posted: {new Date(JSON.parse(review).timeStamp).toDateString()}
              </CardContent>
            </Card>
            </div>))
            :
            null
          }
        </Grid>
        </div>)
      : null
    }
    </div>
  );
}
// component that adds a form of adding a review to this plant
const AddReviewComponent = ({user, addReview}) => {
  // take plantID from route
  let { id } = useParams();

  const username = user ? user[0].name : null;
  let rating;
  let reviewText;
  return (
    <div>
      <form id='addReviewForm'>
        <h2>Add your review on this plant!</h2>
        <label>Write your review here:</label><br/>
        <textarea form='addReviewForm' id='reviewText' rows='5' cols='40'></textarea><br/>
        <label htmlFor='rating'> rate the plant (between 1 and 5)</label>
        <input id='rating' type='number' name='rating' min='1' max='5' onInput={(event) => checkRatingInput(event.target.value)} ></input>
        </form>
        <input type='submit' value='Add review'onClick={(event) => {
          // send the complete review data to the action
          rating = document.getElementById('rating').value;
          rating = parseInt(rating);
          reviewText =document.getElementById('reviewText').value;
          if(reviewText !== null && rating !== null && username !== null){
            const reviewData = {
              username: username,
              rating: rating,
              reviewText: reviewText,
            }
            // dispatch action with reviewdata
            addReview(reviewData, id);
            document.getElementById('addReviewForm').reset();
          }
        }}/>

    </div>
  )
}
const checkRatingInput = (input) => {
  if (input > 5) {
    document.getElementById('rating').value = 5;
  } else if (input < 1) {
    document.getElementById('rating').value = 1;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (reviewData, plantID) => dispatch(addReview(reviewData, plantID)),
    addPlant: (plantAction) => dispatch(addPlant(plantAction))
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
    user: state.firestore.ordered.Users,
    plants: state.firestore.ordered.Plants,
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return !props.uid
    ? [{ collection: 'Plants'}]
    : [{ collection: 'Plants'}, { collection: 'Users', doc: props.uid }]
  }),
)(PlantDetails)
