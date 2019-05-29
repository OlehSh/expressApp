import React from 'react';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import Link from '@material-ui/core/Link/index';

class Header extends React.Component {
  render() {
    return <AppBar position="static" className="App-header">
        <Toolbar>
          <Link href="/" className="App-link">
            Home
          </Link>
          <Link href="/reports" className="App-link" >Coinbase Reports</Link>
        </Toolbar>
      </AppBar>
  }
}
export default Header;
