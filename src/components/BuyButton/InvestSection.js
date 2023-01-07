import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { switchToken, updateOrderUSDVRP, updateOrderUSDVDAO, selectWindow,  } from '../../state/reducer'
import { ApproveTokens,  RequestMax, Buy } from '../../state/hooks'
import * as config from '../../config'

const InvestSection = () => {

    const State = useSelector(state => state)
    const dispatch = useDispatch()
    // const activeBalance = State.token === config.defaultToken ? State.amountUSDVRP : State.amountUSDVDAO
    const orderedBalance = State.token === config.defaultToken ? State.orderUSDVRP : State.orderUSDVDAO
    // "installWallet" || "connectWallet" || "insufficientAmount" || "approve" || "buy"
    const [stage, MoveToStage] = useState("approve")  
    const currency  = State.currency // USDT || BUSD
    const currentToken = State.token
    const btnAddClass = currentToken === config.defaultToken ? "vrp" : "vdao"
    const price  = State.contractData.price
    const usdTokenList = new Map()
    const updateBalanceAction = State.token === config.defaultToken ? updateOrderUSDVRP : updateOrderUSDVDAO
    const [userAgreed, userAgree] = useState(false)
    const [isPending, pendingState] = useState(false)
    const disabledState = (isPending || !userAgreed) ? " btn--disabled" : ""

    const currentContract = () => {
        switch (true) {
            case (currency === config.defaultCurrency && State.token === config.defaultToken) :
            return config.saleContractAddrVRPUSDT
            case (currency === config.defaultCurrency && State.token === config.selectableToken) :
            return config.saleContractAddrVDAOUSDT
            case (currency === config.selectableCurrency && State.token === config.defaultToken) :
            return config.saleContractAddrVRPBUSD
            case (currency === config.selectableCurrency && State.token === config.selectableToken) :
            return config.saleContractAddrVDAOBUSD
            default : 
            return null
        }
    }
    let btn = []

    config.usdTokens.forEach((t) => {
        usdTokenList.set(t.name, t.address)
    })

    const SwitchCurrency  = (e) => {
        // console.log(e)
        dispatch(selectWindow(e))
        // MoveToStage("approve")
    }


    const ApproveToken = async () => {
         pendingState(true)
         const amount = await ApproveTokens(usdTokenList.get(currency),
         currentContract(), State.account, orderedBalance)
         if (amount >= orderedBalance) {
            MoveToStage("buy")
         }
         pendingState(false)
    }

    const Invest = async () => {
        pendingState(true)
        const buying = await Buy(currentContract(), State.account, orderedBalance)
        if (buying) {
          dispatch(updateBalanceAction(0))
          dispatch(selectWindow("success"))
          MoveToStage("approve")
        }
        pendingState(false)
    }

    const checkBox = (event) => {

        userAgree(event.target.checked)
        return !event.target.checked
    }

    const MaxUSD = async () => {
        const MaxTokens = await RequestMax(usdTokenList.get(currency), State.account)
        State.token === config.defaultToken ?
         dispatch(updateOrderUSDVRP(MaxTokens)) :
         dispatch(updateOrderUSDVDAO(MaxTokens)) 
    }

    const UpdateOrderUSD = (event) => {
        const newValue = event.target.value
        if (newValue <= config.maxInvestments) {
            dispatch(updateBalanceAction(newValue))
        }
    }


    function mainBtn () {
        btn = []
        switch (stage) {
            case "installWallet" :
            btn.push(
                <div key="stage0" className={`confirm--button ${btnAddClass} install--stage${disabledState}`}>
                    {isPending? "Pending..." : "Install wallet to start investing"}
                </div>
            )
            break;
            case "connectWallet" :
            btn.push(
                    <div key="stage1" className={`confirm--button ${btnAddClass} connect--stage${disabledState}`}>
                         {isPending? "Pending..." : "Connect Wallet"}
                    </div>
                )
            break;
            case "insufficientAmount" :
            btn.push(
                <div key="stage2" className={`confirm--button ${btnAddClass}${disabledState}`}>
                    {isPending? "Pending..." : "Not enough currency"}
                </div>
            )
            break;
            case "approve" : 
            btn.push(
                <div key="stage3" className={`confirm--button ${btnAddClass}${disabledState}`}
                 onClick={ApproveToken}>
                    {isPending? "Pending..." : "Approve"}
                </div>
            )
            break;
            case "buy" :
            btn.push(
                <div key="stage4" onClick={Invest}
                className={`confirm--button ${btnAddClass}${disabledState}`}>
                    {isPending? "Pending..." : "Buy tokens"}
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
                    <input type="number" className="order--input" value={orderedBalance} onChange={UpdateOrderUSD} />
                </div>
            </div>
            <div className="invest--select">
                <div className="currency--selector">
                  <div className="max--value--btn" onClick={MaxUSD}>MAX</div>
                    <div className="selected--token" onClick={SwitchCurrency.bind(this, "selectCurrency")}>
                        <img src={currency === config.defaultCurrency ? 
                        "images/icons/USDT.png" : "images/icons/BUSD.png"} width="30" height="30" />
                        <p>{currency}</p>
                    </div>
                </div>
            </div>
         </div>
         <div className="invest--count--section section--to">
            <div className="invest--num">
                <div className="invest--num--title">
                    to
                </div>
                <div className="invest--num--count">
                    {price ? ((orderedBalance * config.decimal )/ price) : 0}
                </div>
            </div>
            <div className="invest--select">
                <div className="currency--selector">
                  <div className="max--value--btn" onClick={MaxUSD}>MAX</div>
                    <div className="selected--token" onClick={SwitchCurrency.bind(this, "selectToken")}>
                        <img src={State.token === config.defaultToken ? 
                        "images/icons/VRP.png" : "images/icons/VAO.png"} width="30" height="30" />
                        <p>{State.token}</p>
                    </div>
                </div>
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