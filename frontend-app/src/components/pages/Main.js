import React from 'react';
import Typography from '@material-ui/core/Typography';

class Main extends React.Component {
    componentDidMount() {
      console.log('component Mounted');
    }
  render() {
    return <Typography variant='h2' component='h1' gutterBottom>
          My Express App 111
        </Typography>
  }
}

export default Main;
