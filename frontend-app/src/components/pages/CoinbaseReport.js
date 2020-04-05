import React from "react";
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import Button from "@material-ui/core/Button"
import CheckboxPanel from "./../basicElements/checkboxPanel/CheckboxPanel"
import RadiobuttonsGroup from "./../basicElements/RadiobuttonsGroup/RadiobuttonsGroup"
import axios from "axios";
import Container from "@material-ui/core/Container";

class CoinbaseReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['item searched'],
      tableRows: [],
      checkboxList: {
        EUR: false,
        USD: false,
        UAH: false,
      },
      buttonsList: {
        ETH: false,
        KRB: false,
        BTC: false,
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.getSinglePrise = this.getSinglePrise.bind(this);
  }
  getSinglePrise() {
    console.log(this.state.checkboxList);
    let url = `http://localhost:3001/crypto/single-price/`;
    let options = {params: {convertTo: 'USD'}};
    Object.keys(this.state.checkboxList).map((key) => {
      if(this.state.checkboxList[key]){
        console.log(key);
        url +=`${key},`
      }
    });
    axios.get(url.replace(/,$/,''), options)
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
        this.setState(() => ({
          tableHead: tableHead,
          tableRows: tableRows
        }));
      })
      .catch(err => {
        console.warn({file: 'CoinbaseReport.js', message: err.message});
      })
  };
  handleChange(name, event) {
    const status = event.target.checked;
    this.setState((state) => {
        state.checkboxList[name] = status;
        return state;
      }
    )
  };
  handleRadioButtons(event) {
    console.log(event);
  }
  render() {
    return <Container fixed>
      <Typography variant="h3" component="h2" gutterBottom>
        Data Table
      </Typography>
      <div className='button-wrapper'>
        <Button onClick={this.getSinglePrise} variant="contained" color="default">Get Price</Button>
      </div>
      <CheckboxPanel title='Money list' handleChange = {this.handleChange} checkboxList={this.state.checkboxList}/>
      <RadiobuttonsGroup title='Crypto list' handleRadioButtons = {this.handleRadioButtons} buttonsList = {this.state.buttonsList}/>
      {this.state.tableHead.length > 0 && this.state.tableRows.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              {this.state.tableHead.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.tableRows.map((row, index) => (
              <TableRow key={index}>
                {row.map((item, indexKey) => (
                  <TableCell key={indexKey} component="td" scope="item">
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (<Typography align='center' component='div' gutterBottom paragraph>No Data</Typography>)}
    </Container>
  }
}
export default CoinbaseReport;
