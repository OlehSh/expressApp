import React from "react";
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"

class CoinbaseReport extends React.Component {
  render() {
    return <Paper>
      <Typography variant="h3" component="h2" gutterBottom>
        Data Table
      </Typography>
      {/*{this.state.tableHead.length > 0 && this.state.tableRows.length > 0 ? (*/}
      {/*  <Table>*/}
      {/*    <TableHead>*/}
      {/*      <TableRow>*/}
      {/*        {this.state.tableHead.map(cell => (*/}
      {/*          <TableCell>{cell}</TableCell>*/}
      {/*        ))}*/}
      {/*      </TableRow>*/}
      {/*    </TableHead>*/}
      {/*    <TableBody>*/}
      {/*      {this.state.tableRows.map(row => (*/}
      {/*        <TableRow>*/}
      {/*          {row.map(item => (*/}
      {/*            <TableCell component="th" scope="item">*/}
      {/*              {item}*/}
      {/*            </TableCell>*/}
      {/*          ))}*/}
      {/*        </TableRow>*/}
      {/*      ))}*/}
      {/*    </TableBody>*/}
      {/*  </Table>*/}
      {/*) : 'TEST ROUTES'}*/}
    </Paper>
  }
}
export default CoinbaseReport;
