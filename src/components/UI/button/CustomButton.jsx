import React from 'react';
import classes from './CustomButton.module.scss';

function CustomButton({children, ...props}) {
  return (
    <button {...props} className={classes.cBtn}>
      {children}
    </button>
  )
}

export default CustomButton