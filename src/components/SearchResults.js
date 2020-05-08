import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../logo.png';
import '../App.css';
import { searchPlants, getPlantDetails } from '../api/trefleApiCalls';
import RenderPromise from '../util/RenderPromise';

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
    cursor: "pointer",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const SearchResults = () => {
  let { searchString, completeData } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const createSearchPromise = (search, complete) => {
    return searchPlants(search, complete === 'true').then(async (results) => {
      const getImages = results.map(async (plant) => {
        await getPlantDetails(plant.id).then(details => {
          plant.imageURL = (details && details.images.length > 0) ? details.images[0].url : null;
        })
      });

      await Promise.all(getImages)
      return results;
    });
  }

  const [searchPromise, setSearchPromise] = useState(createSearchPromise(searchString, completeData));

  useEffect(() => {
    setSearchPromise(createSearchPromise(searchString, completeData));
  }, [searchString, completeData]);

  const createSearchResults = (data) => {
    return (
      <Grid container spacing={4}>
        {data.map((plant) => (
        <Grid item key={plant.id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
        <CardMedia
        className={classes.cardMedia}
        image={plant.imageURL ? plant.imageURL : logo}
        title="Image title"
        onClick={() => { history.push("/plantDetails/" + plant.id) }}
        />
        <CardContent className={classes.cardContent}>

        <Typography gutterBottom variant="h5" component="h2">
        {plant.common_name ? plant.common_name : "No common name"}
        </Typography>

        <Typography>
        <i>{plant.scientific_name}</i>
        </Typography>

        </CardContent>

        </Card>
        </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Search results
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Select a plant that you wish to see more details about below
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}

          <RenderPromise promise={searchPromise} renderData={({data}) => { return createSearchResults(data) }} setNull={true} />

        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          This is the end of the search results
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          No more plants to see here!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );

}

export default connect(
  null,
  null
)(SearchResults);
