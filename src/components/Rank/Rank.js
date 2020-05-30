import React from 'react';

const Rank = ({user}) => {
  let name=user.name
  let count=user.entries
  return (
    <div style={{marginTop:'200px'}}>
      <div className='white f3'>
        {`${name}, your current count is....`}
      </div>
      <div className='white f1'>
        {`#${count}`}
      </div>
    </div>
  )
}

export default Rank;