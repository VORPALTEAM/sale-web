import React, { useState, useEffect } from 'react';

const AmountInput = () => {
    return(
      <>
        <div className="amount--input">
              <input name="amount" type="number" placeholder="0000.0000" step="any" />
            </div>
            <div className="amount--calculator">
              <div className="number--key">
                1
              </div>
              <div className="number--key">
                2
              </div>
              <div className="number--key">
                3
              </div>
              <div className="number--key">
                4
              </div>
              <div className="number--key">
                5
              </div>
              <div className="number--key">
                6
              </div>
              <div className="number--key">
                7
              </div>
              <div className="number--key">
                8
              </div>
              <div className="number--key">
                9
              </div>
              <div className="number--key">
                0
              </div>
              <div className="number--key">
                .
              </div>
              <div className="number--key">
                Backspace
              </div>
            </div>
      </>
    )
}

export default AmountInput