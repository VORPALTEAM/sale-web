import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  switchToken,
  switchCurrency,
  selectWindow,
  updateApproved,
} from "../../state/reducer";
import { AcknowApprovedAmount, ContractDataSetup } from "../../state/hooks";
import * as config from "../../config";

const NoFundsWindow = () => {
  const State = useSelector((state) => state);
  const dispatch = useDispatch();
  const currencyIsDefault = State.currency === config.defaultCurrency;

  return (
    <div className="modal--window select--window walletBalanceWindow">
        <div className="balanceWindowHeading">Insufficient balance</div>
        <div className="balanceWindowText">
          {`You have only ${
            currencyIsDefault ? State.walletUSDT : State.walletBUSD
          } ${
            currencyIsDefault ? "USDT" : "BUSD"
          }. Get more on your wallet and try again`}
        </div>
    </div>
  );
};

export default NoFundsWindow;
