import React from 'react';
import classes from './CustomInput.module.scss'

function CustomInput(props) {
  return (
    <input className={classes.cInp} {...props} />
  )
}

export default CustomInput