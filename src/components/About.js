import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import logo from '../logo.png';


const About = () => {
  return(
    <div>
        <CssBaseline />
            <Container maxWidth="sm">
                {/* <Card>
                    <CardContent> */}
                        <Typography variant="h2" component="h1" gutterBottom>
                            Welcome to Goodseeds!
                        </Typography>
                        <Typography variant="h5" component="h2" gutterBottom>
                            This is a tool for searching, reviewing and keeping track of your plants.
                        </Typography>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Start by signing up or logging in, then you can start searching for plants in the bar above! 
                        </Typography>
                        <Typography variant="h6" component="h2" gutterBottom>
                            When you search for a plant, you can add it to your garden. Update its water period and remember to water it as often as you want!
                        </Typography>
                        <Typography variant="caption">
                        Some of the plants in the search results may not have images, have information on fire resistance etc. The box <i>Complete data</i> allows you to search for plants that have complete data, meaning all fields are filled in.
                        </Typography>
                        <img src={logo} alt={"Goodseeds"}/>
                        <br/>
                        <br/>
                        <br/>
            </Container>
            <footer gutterBottom>
                <Typography variant="h6" align="center" gutterBottom>
                    This website was created for [DD2642]
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Created by Anton, August, Felix and Lara
                </Typography>
            </footer>
    </div>
  );
}


export default connect(null, null)(About)
