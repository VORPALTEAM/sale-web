import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoFullIcon from "./icons/logoFull";
import MainMenu from "./menu";
import ActionBtn from "./actionBtn";
import { Auth } from "~/blockchain";
import { AddAccount, RootState } from "~/state/reducer";
import { VisibleName } from "../../utils/strings";

const Header = () => {
  const [isPending, Pending] = useState(false);
  const State = useSelector((state: RootState ) => {
    return state;
  });
  const dispatch = useDispatch();

  const WalletAuth = async () => {
    if (!isPending) {
      Pending(true);
      await Auth()
        .then((account) => {
          dispatch(AddAccount(account));
        })
        .catch((e) => {
          console.log(e);
        });
      Pending(false);
    }
  };

  return (
    <div className="header">
      <div className="headerSection logoSection">
        <LogoFullIcon width={234} height={36} />
      </div>
      <div className="headerSection menuSection">
        <MainMenu />
      </div>
      <div className="headerSection authSection">
        <ActionBtn text={!State.account ? "Connect wallet": VisibleName(State.account)} onClick={WalletAuth} />
      </div>
    </div>
  );
};

export default Header;
