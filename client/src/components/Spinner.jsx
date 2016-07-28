import React from 'react';

const Spinner = (props) => {
  let hidden = props.hidden ? '.hidden' : '';
  return (
    <div className="preloader-wrapper big active {hidden}">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  )
};
