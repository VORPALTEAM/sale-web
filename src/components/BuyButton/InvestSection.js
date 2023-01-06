import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { switchToken, updateUSDVRP, updateUSDVDAO } from '../../state/reducer'
import { ApproveTokens,  AcknowApprovedAmount, Buy } from '../../state/hooks'
import * as config from '../../config'

const InvestSection = () => {

    const State = useSelector(state => state)
    const dispatch = useDispatch()
    const activeBalance = State.token === config.defaultToken ? State.amountUSDVRP : State.amountUSDVDAO
    // "installWallet" || "connectWallet" || "insufficientAmount" || "approve" || "buy"
    const [stage, MoveToStage] = useState("approve")  
    const [currency, SelectCurrency] = useState("USDT") // USDT || BUSD
    const currentToken = State.token
    const btnAddClass = currentToken === config.defaultToken ? "vrp" : "vdao"
    const price  = State.contractData.price
    const usdTokenList = new Map()
    const updateBalanceAction = State.token === config.defaultToken ? updateUSDVRP : updateUSDVDAO
    const [userAgreed, userAgree] = useState(false)

    const currentContract = () => {
        switch (true) {
            case (currency === "USDT" && State.token === config.defaultToken) :
            return config.saleContractAddrVRPUSDT
            case (currency === "USDT" && State.token === config.selectableToken) :
            return config.saleContractAddrVDAOUSDT
            case (currency === "BUSD" && State.token === config.defaultToken) :
            return config.saleContractAddrVRPBUSD
            case (currency === "BUSD" && State.token === config.selectableToken) :
            return config.saleContractAddrVDAOBUSD
        }
    }
    let btn = []

    config.usdTokens.forEach((t) => {
        usdTokenList.set(t.name, t.address)
    })

    const SwitchCurrency = (event) => {
        SelectCurrency(event.target.value)
        MoveToStage("approve")
    }

    const SwitchToken = (event) => {
        dispatch(switchToken(event.target.value))
        MoveToStage("approve")
    }


    const ApproveToken = async () => {

         const amount = await ApproveTokens(usdTokenList.get(currency),
         currentContract(), State.account, activeBalance)
         if (amount >= activeBalance) {
            MoveToStage("buy")
         }
    }

    const Invest = async () => {
        const buying = await Buy(currentContract(), State.account, activeBalance)
        if (buying) {
          dispatch(updateBalanceAction)
        }
    }

    const checkBox = (event) => {
        console.log("ok")
        userAgree(event.target.checked)
        return !event.target.checked
    }


    function mainBtn () {
        btn = []
        switch (stage) {
            case "installWallet" :
            btn.push(
                <div key="stage0" className={`confirm--button ${btnAddClass} install--stage`}>
                    Install wallet to start investing
                </div>
            )
            break;
            case "connectWallet" :
            btn.push(
                    <div key="stage1" className={`confirm--button ${btnAddClass} connect--stage`}>
                        Connect Wallet
                    </div>
                )
            break;
            case "insufficientAmount" :
            btn.push(
                <div key="stage2" className={`confirm--button ${btnAddClass} insufficient--stage`}>
                    Not enough currency
                </div>
            )
            break;
            case "approve" : 
            btn.push(
                <div key="stage3" className={`confirm--button ${btnAddClass} insufficient--stage`}
                 onClick={ApproveToken}>
                    Approve
                </div>
            )
            break;
            case "buy" :
            btn.push(
                <div key="stage4" onClick={Invest}
                className={`confirm--button ${btnAddClass} insufficient--stage`}>
                    Buy tokens
                </div>
            )
            break;
        }
        return btn
    }

    mainBtn ()

    return(
       <div className="">
         <div className="invest--count--section section--from">
            <div className="invest--num">
                <div className="invest--num--title">
                    from
                </div>
                <div className="invest--num--count">
                    {activeBalance}
                </div>
            </div>
            <div className="invest--select">
                <select onChange={SwitchCurrency}>
                    <option value="USDT">USDT</option>
                    <option value="BUSD">BUSD</option>
                </select>
            </div>
         </div>
         <div className="invest--count--section section--to">
            <div className="invest--num">
                <div className="invest--num--title">
                    to
                </div>
                <div className="invest--num--count">
                    {price ? ((activeBalance * config.decimal )/ price) : 0}
                </div>
            </div>
            <div className="invest--select">
                <select onChange={SwitchToken}>
                    <option value={config.defaultToken}>{config.defaultToken}</option>
                    <option value={config.selectableToken}>{config.selectableToken}</option>
                </select>
            </div>
         </div>
         <div className="invest--description">
            <p>
            WebGradients is a free collection of 180 linear gradients that you can use as
            content backdrops in any part of your website. Easy copy CSS3 crossbrowser code
            and use it in a moment! <a>How to buy?</a>
            </p>
         </div>
         <div className="buy--confirm--section">
            <div className="agree--dot">
                <label className="agree--label">
                   <input type="checkbox" onChange={checkBox} />
                   <span className={`agree--checker${userAgreed ? " agreed" : ""}`} />
                </label>
                <p>
                   <a>I accept all terms and conditions</a>
                </p>
            </div>
            <div className="buy--button--section final--button">
                {btn}
            </div>
         </div>
       </div>
    )
}

export default InvestSection