import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


const NoWallet = () => {
    return(
        <div className="modal--window">Crypto wallet not found in your browser yet</div>
    )
}

export default NoWallet