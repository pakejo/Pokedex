import React from 'react'

const Grid = (props) => {
  return (
    <div className="px-5 my-5 container-fluid">
      <div className="px-auto my-5 col-md-12 align-items-start">
        <div className="row" >
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Grid;