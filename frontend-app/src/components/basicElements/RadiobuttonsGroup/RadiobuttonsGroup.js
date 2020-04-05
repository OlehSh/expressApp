import React from "react";
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import {Radio} from "@material-ui/core";


class radioButtonsGroup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.buttonsList
    };
  }

  render() {
    return <FormControl component="fieldset">
      <FormLabel component="legend">{this.props.title}</FormLabel>
      <RadioGroup onChange={this.props.handleRadioButtons}>
        {Object.keys(this.props.buttonsList).map((key) => (
          <FormControlLabel key={key} value={key}
            control={<Radio />}
            label={key}
          />
        ))}
      </RadioGroup>
    </FormControl>
  }
}
export default radioButtonsGroup;
