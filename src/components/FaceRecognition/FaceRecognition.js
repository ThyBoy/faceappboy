import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({box, imageurl }) => {
      return (
        <div className= 'center ma'>
          <div className= ' relative mt2'>
            <img id='inputimage' alt='inputimage' src={ imageurl } width='800px' height='auto' />
            {box.map((i,index) => {
                return <div key={index} className='bounding-box' style={{top:i[0], right: i[1],height:i[3], width:i[2]} } />
            })}
          </div>
        </div>
    );
  }

export default FaceRecognition;
/*<div className='bounding-box' style={{top:box.toprow, right: box.rightcol,height:box.height1, width:box.width1} }/>*/