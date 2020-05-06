import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const About = () => {
  return(
    <div>
        <CssBaseline />
            <Container maxWidth="sm">
                <Card>
                    <CardContent>
                        <Typography variant="h2" component="h1" gutterBottom>
                            Welcome to Goodseeds!
                        </Typography>
                        <Typography variant="h5" component="h2" gutterBottom>
                            This page is for searching, reviewing and keeping track of your plants.
                        </Typography>
                        {/* <Typography variant="caption" component="h2" gutterBottom>
                            Sign up or log in
                        </Typography>
                        <Typography variant="caption" component="h2" gutterBottom>
                            Search for plants to add to your garden
                        </Typography>
                        <Typography variant="caption" component="h2" gutterBottom>
                            Water your plants
                        </Typography>
                        <Typography variant="caption" component="h2" gutterBottom>
                            Review your plants
                        </Typography> */}

                    </CardContent>
                    <CardActions justify='center'>
                        <Button>
                            Sign up
                        </Button>
                        <Button>
                            Log in
                        </Button>
                        <Button>
                            Go to Garden
                        </Button>
                    </CardActions>
                </Card>
            </Container>
    </div>
  );
}


export default connect(null, null)(About)
