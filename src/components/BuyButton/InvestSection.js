import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { switchToken, updateOrderUSDVRP, updateOrderUSDVDAO, selectWindow,
    updateLockedVRP, updateLockedVDAO,  selectStage, openInvest } from '../../state/reducer'
import { ApproveTokens,  RequestMax, RequestSaleStart, Buy, WithdrawTokens, 
    RequestLockedFunds, AcknowApprovedAmount } from '../../state/hooks'
import * as config from '../../config'

const InvestSection = () => {

    const State = useSelector(state => state)
    const dispatch = useDispatch()
    const [cachedApprovedValueUSDT, cacheApprovedValueUSDT] = useState(0)
    const [cachedApprovedValueBUSD, cacheApprovedValueBUSD] = useState(0)
    const [withdrawalAmount, setWithdrawal] = useState(0)
    // const activeBalance = State.token === config.defaultToken ? State.amountUSDVRP : State.amountUSDVDAO
    const isDefault = State.token === config.defaultToken
    const orderedBalance = isDefault ? State.orderUSDVRP : State.orderUSDVDAO
    // "installWallet" || "connectWallet" || "insufficientAmount" || "approve" || "buy"
    const stage = State.stage
    const currency  = State.currency // USDT || BUSD
    const btnAddClass = isDefault ? "vrp" : "vdao"
    const price  = isDefault ? config.priceVRP : config.priceVDAO
    const usdTokenList = new Map()
    const updateBalanceAction = isDefault ? updateOrderUSDVRP : updateOrderUSDVDAO
    const [userAgreed, userAgree] = useState(false)
    const [isPending, pendingState] = useState(false)
    const [isStarted, startSale] = useState(0)
    const [isStatusRequested, isRequest] = useState(0)

    const disabledState = (isPending || !userAgreed || !isStarted ) ? " btn--disabled" : ""


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

    async function IsSaleStart () {
        if (isStatusRequested) return isStarted;
        const startStatus = await RequestSaleStart(currentContract())
        startSale(startStatus)
        isRequest(1)
        return startStatus
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


    useEffect(() => {
        if (State.account) {
            AcknowApprovedAmount(usdTokenList.get(currency), currentContract(), State.account ).then((res) => {
                if (isDefault) {
                    cacheApprovedValueUSDT(res)
                } else {
                    cacheApprovedValueBUSD(res)
                }
                dispatch(selectStage("approve"))
                // if (res > 0) dispatch(selectStage("buy"))
            }, (rej) => {
                dispatch(selectStage("approve"))
            })
        }   
    }, [])

    const UpdateWithdraw = (event) => {
        if (event.target.value) {
            setWithdrawal(event.target.value)
        }
    }


    const ApproveToken = async () => {
         pendingState(true)
         const amount = await ApproveTokens(usdTokenList.get(currency),
         currentContract(), State.account, orderedBalance).then((res) => {
            // console.log(res)
            AcknowApprovedAmount(usdTokenList.get(currency), currentContract(), State.account ).then((res) => {
                // console.log("What is known : ")
                // console.log(res)
                // console.log(orderedBalance)
                pendingState(false)
                if (isDefault) {
                    cacheApprovedValueUSDT(res)
                } else {
                    cacheApprovedValueBUSD(res)
                }
                if (res >= orderedBalance) dispatch(selectStage("buy"))
            })
         }, (rej) => {
            pendingState(false)
            dispatch(selectStage("approve"))
         }) // orderedBalance
         /* if (amount >= orderedBalance && amount > 0) {
            dispatch(selectStage("buy"))
         } */
    }

    const Invest = async () => {
        pendingState(true)
        await Buy(currentContract(), State.account, orderedBalance)

          dispatch(updateBalanceAction(0))
        if (isDefault) {
            cacheApprovedValueUSDT((a) => {
                return a - orderedBalance 
            })
        } else {
            cacheApprovedValueBUSD((a) => {
                return a - orderedBalance 
            })
        }

          const requestingContracts = isDefault ? [
            config.saleContractAddrVRPUSDT,
            config.saleContractAddrVRPBUSD
          ] : [
            config.saleContractAddrVDAOUSDT,
            config.saleContractAddrVDAOBUSD
          ]
          const lastLocked = isDefault ? State.lockedVRP : State.lockedVDAO
          setTimeout(() => {
            RequestLockedFunds(requestingContracts, State.account).then((res, rej) => {

                if (res) {
                    if (res > lastLocked) {
                        dispatch(selectWindow(config.windowNames.success))
                        dispatch(openInvest(false))
                        dispatch(selectStage("approve"))
                    }
                }

                if (isDefault) {
                    dispatch(updateLockedVRP(res))
                  } else {         
                    dispatch(updateLockedVDAO(res))
                  }
            })
          }, 1000)

        pendingState(false)
    }

    const checkBox = (event) => {

        userAgree(event.target.checked)
        return !event.target.checked
    }

    const MaxUSD = async () => {
        const MaxTokens = await RequestMax(usdTokenList.get(currency), State.account)
        State.token === config.defaultToken ?
         dispatch(updateOrderUSDVRP(Math.round(MaxTokens))) :
         dispatch(updateOrderUSDVDAO(Math.round(MaxTokens))) 
    }

    const UpdateOrderUSD = (event) => {
        let newValue = event.target.value.toString()
            if (newValue[0] === '0' && newValue.length > 1) {
              newValue = newValue.substring(1)
            }
        const allowance = isDefault ? cachedApprovedValueUSDT : cachedApprovedValueBUSD
        if (newValue === "" || newValue === null) {
            newValue = "0"
        }
        if (newValue <= config.maxInvestments ) {
            dispatch(updateBalanceAction(newValue))
            if (newValue > allowance) {
                dispatch(selectStage("approve"))
            } else {
                if (newValue > 0) dispatch(selectStage("buy"))
            }
        }
    }

    const UpdateOrderBYToken = (event) => {
        let newValue = event.target.value.toString()
            if (newValue[0] === '0' && newValue.length > 1) {
              newValue = newValue.substring(1)
            }
        const allowance = isDefault ? cachedApprovedValueUSDT : cachedApprovedValueBUSD
        if (newValue === "" || newValue === null) {
            newValue = "0"
        }
        let updatingValue = parseInt(newValue) * price
        if (updatingValue > 1) {
            updatingValue = Math.round(updatingValue)
        } else {
            updatingValue = 1
        }
        if (updatingValue <= config.maxInvestments ) {
            dispatch(updateBalanceAction(updatingValue))
            if (updatingValue > allowance) {
                dispatch(selectStage("approve"))
            } else {
                if (updatingValue > 0) dispatch(selectStage("buy"))
            }
        }
    }

    const RequestWithdraw = async () => {
        const isWithdrawn = await WithdrawTokens(currentContract(), withdrawalAmount * config.decimal, State.account)
        if (isWithdrawn) {
            alert("Tokens must be withdrawn")
        } else {
            alert("Something went wrong!")
        }
    }

    IsSaleStart()


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
                    {isPending? "Pending..." : "Buy"}
                </div>
            )
            break;
        }
        return btn
    }

    mainBtn ()

    return(
       <div className="invest--container" onLoad={IsSaleStart}>
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
                {/* <input type="number" className="order--input" 
                value={price ? (orderedBalance / price) : 0} onChange={UpdateOrderBYToken} /> */}
                <div className="invest--num--count">
                    {price ? (Math.round(orderedBalance / price)) : 0}
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
              You need to agree with terms and conditions and then to approve tokens in amount not smaller than you will buy. When you'll buy it 
              you will get it on locked balance. Then it's will unlocked through westing period.
              <a>How to buy?</a>
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
         <div className="withdraw--section">
            <input type="number" value={withdrawalAmount} onChange={UpdateWithdraw} />
            <button onClick={RequestWithdraw}>Withdraw</button>
         </div>
       </div>
    )
}

export default InvestSection