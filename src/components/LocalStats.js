import React, { useState, useEffect } from 'react';

const LocalStats = () => {
    return(
      <>
        <div className="buy--column--cell row--1">
              <div className="value--text">
                40 000 000 vrp 
              </div>
            </div>
            <div className="buy--column--cell row--2">
              <div className="value--subtitle">
                Title
              </div>
              <div className="value--text">
                0.00002 %
              </div>
            </div>
            <div className="buy--column--cell row--2">
              <div className="value--subtitle">
                Title
              </div>
              <div className="value--text">
                0.00002 %
              </div>
            </div>
            <div className="buy--column--cell">
              <div className="stage--heading">
                Balance
              </div>
            </div>
            <div className="buy--column--cell row--2">
              <div className="value--subtitle red">
                 locked till 01.01.23
              </div>
              <div className="value--text">
                 40 000 000 VRP
              </div>
            </div>
            <div className="buy--column--cell row--2 no--border">
              <div className="value--subtitle green">
                 unlocked
              </div>
              <div className="value--text">
                 40 000 000 VRP
              </div>
            </div>
      </>
    )
}

export default LocalStats