import React from 'react';

import cl from './CustomModal.module.scss'

function CustomModal({children, visible, setVisible}) {
  
  const rootClasses = [cl.cMod];

  if (visible) {
    rootClasses.push(cl.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.cModContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default CustomModal