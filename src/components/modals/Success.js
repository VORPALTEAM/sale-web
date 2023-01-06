import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


const SuccessNotify = () => {
    return(
        <div className="modal--window">
            <div className="modal--message">
                <h3>Congragilations! When presale will finished,
            your tokens will available towithdraw</h3></div>
        </div>
    )
}

export default SuccessNotify