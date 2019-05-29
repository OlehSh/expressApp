import React from 'react';
import axios from 'axios';
import {BrowserRouter, Route} from "react-router-dom";
import './App.scss';
import Main from "./pages/Main";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import CoinbaseReport from "./pages/CoinbaseReport";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['item searched'],
      tableRows: []
    };
    this.getSinglePrise = this.getSinglePrise.bind(this);
  }

  getSinglePrise() {
    axios.get('http://localhost:4001/crypto/single-price/ETH?convertTo=USD')
      .then(response => {
        let tableHead = [''];
        let tableRows = [];
        let row = ['ETH'];
        for (let key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            tableHead.push(key);
            row.push(response.data[key]);
          }
        }
        tableRows.push(row);
        console.log(row);
        console.log(tableRows);
        this.setState(() => ({
          tableHead: tableHead,
          tableRows: tableRows
        }));
        console.log(this.state.tableRows);
      })
      .catch(err => {
        console.warn({file: 'App.js', function: 'getSinglePrises', message: err.message});
      })
  };

// <div className="App">
// <div className="App-content">
// <Typography variant="h2" component="h1" gutterBottom>
// My Express App
// </Typography>
//
// </div>
// </div>
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppBar position="static" className="App-header">
            <Toolbar>
              <Link href="/home" className="App-link">
                Home
              </Link>
              <Link href="/reports" className="App-link">Coinbase Reports</Link>
            </Toolbar>
          </AppBar>
          <Route path={"/"}>
            <Route path={"/home"} component={Main}/>
            <Route path={"/reports"} component={CoinbaseReport}/>
          </Route>
        </div>
      </BrowserRouter>
    )
  };

}

export default App;
