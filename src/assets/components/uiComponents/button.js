import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet(theme => ({
  button: {
    margin: theme.spacing.unit,
  },
}));

function FlatButtons(props) {
  const classes = props.classes;
  return (
    <div style={{width:'50%'}}>
      <Button style={{color:'azure',fontSize:'12px',height:'100%',width:'100%',margin:'0'}} color="primary" className={classes.button}>
        {props.label}
      </Button>
    </div>
  );
}

FlatButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FlatButtons);