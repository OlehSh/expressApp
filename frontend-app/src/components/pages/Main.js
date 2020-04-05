import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";

class Main extends React.Component {
  render() {
    return <Container fixed>
      <Typography variant='h2' component='h1' gutterBottom>
        My Express App
      </Typography>
    </Container>
  }
}

export default Main;
