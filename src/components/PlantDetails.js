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
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from '../util/styleHandler';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props}/>
}

const PlantDetails = ({uid, user, plants, addPlant, addReview}) => {
  let {id} = useParams();
  const [detailsPromise, setDetailsPromise] = useState(getPlantDetails(id));
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDetailsPromise(getPlantDetails(id))
  }, [id]);

  const handleSubmit = (string) => {
    if (string ==='addReview') {
      setMessage('Added a review for this plant!');
      setOpen(true);
    } else if (string === 'addPlant') {
      setMessage('Added this plant to your garden!');
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  const plantReviews = plants ? plants : null;
  const createPlantDisplay = plantDetails => {
    return (
      <div>
        <List className= {classes.list}>
          <Typography variant="h4" align="center" gutterBottom>{plantDetails.scientific_name}</Typography>
          <Typography variant="h6" align="center" gutterBottom>{plantReviews && plantReviews.find(plant => plant.id === id) ? 'Average rating: ' + plantReviews.find(plant => plant.id === id).avg_rating.toFixed(1) : 'No average rating'}</Typography>
          <ListItem>
            <span className='plant-image'>
              <img src={plantDetails.images.length > 0 ? plantDetails.images[0].url : logo} width='400px' alt="" />
              <div>
              </div>
              <div>
                {!uid
                  ? "Sign up or Log in to add this plant to your garden"
                  : <Button variant="contained" color='primary' onClick={() =>{
                      if (window.confirm('Do you want to add this plant to your garden?')) {
                        addPlant({userID: uid, plantID: plantDetails.id})
                        handleSubmit('addPlant');
                      }
                    }}
                   disabled={user ? user[0].plants.some(plant => (JSON.parse(plant).id === plantDetails.id)) : false}>Add to my garden</Button>}
              </div>
            </span>
          </ListItem>
          <div>
            <ListItem>
              <div>
                <b>Common name: </b> {plantDetails.common_name ? plantDetails.common_name : <i>No data</i>}
              </div>
            </ListItem>
            <ListItem>
              <div>
                <b>Family common name: </b> {plantDetails.family_common_name ? plantDetails.family_common_name : <i>No data</i>}
              </div>
            </ListItem>
            <ListItem>
              <div>
                <b>Scientific name: </b> {plantDetails.scientific_name ? plantDetails.scientific_name : <i>No data</i>}
              </div>
            </ListItem>
            <ListItem>
              <div>
                <b>Duration: </b>  {plantDetails.duration ? plantDetails.duration : <i>No data</i>}
              </div>
            </ListItem>
            <ListItem>
              <div>
                <b>Fire resistance: </b>  {plantDetails.main_species.specifications.fire_resistance ? plantDetails.main_species.specifications.fire_resistance : <i>No data</i>}
              </div>
            </ListItem>
            <ListItem>
              <div>
                <b>Growth period: </b>  {plantDetails.main_species.specifications.growth_period ? plantDetails.main_species.specifications.growth_period : <i>No data</i>}
              </div>
            </ListItem>
          </div>
        </List>
      </div>
    )
  }

  return (<div className='details-layout'>
    <RenderPromise promise={detailsPromise} renderData={({data}) => (<div className='plant-details'>{createPlantDisplay(data)} </div>)} setNull={true} />
    <div  className='plant-reviews'>
    {!uid
      ? 'Sign up or login in to add a review to this plant'
      :  <AddReviewComponent user={user} addReview={addReview} handleSubmit={handleSubmit}/>
    }
    {
      plantReviews
      ? (<Container className='posted-reviews' aligncontent="center">
          <h3>Reviews</h3>
          <Grid item key={plantReviews} xs={2} sm={2} md={4} >
          { plantReviews.find(plant => plant.id === id) && plantReviews.find(plant => plant.id === id).reviews ? plantReviews.find(plant => plant.id === id).reviews.map(review => (
            <div key={JSON.parse(review).username + JSON.parse(review).timeStamp} className='plant-review'>
              <Card className={classes.reviewCard}>
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
      </Container>)
      : null
    }
    </div>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
    </div>
  );
}
// component that adds a form of adding a review to this plant
const AddReviewComponent = ({user, addReview, handleSubmit}) => {
  // take plantID from route
  let { id } = useParams();

  const username = user ? user[0].name : null;
  let rating;
  let reviewText;
  return (
    <div className='addReviewComponent'>
      <form id='addReviewForm'>
        <h2>Add your review on this plant!</h2>
        <label>Write your review here:</label><br/>
        <textarea form='addReviewForm' id='reviewText' rows='5' cols='40'></textarea><br/>
        <label htmlFor='rating'> Rate the plant (between 1 and 5)</label>
        <input id='rating' type='number' name='rating' min='1' max='5' onInput={(event) => checkRatingInput(event.target.value)} ></input>
      </form>
        <Button type='submit' variant='contained' color='secondary' onClick={(event) => {
          // send the complete review data to the action
          rating = document.getElementById('rating').value;
          rating = parseInt(rating);
          reviewText =document.getElementById('reviewText').value;
          if(reviewText.length > 0 && !isNaN(rating) && username !== null){
            const reviewData = {
              username: username,
              rating: rating,
              reviewText: reviewText,
            }
            // dispatch action with reviewdata
            addReview(reviewData, id);
            handleSubmit('addReview');
            document.getElementById('addReviewForm').reset();
          }
        }}>Add review</Button>

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
