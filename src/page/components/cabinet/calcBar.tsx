import React from "react";

const CalcBar = () => {

    return(
        <div className="calculationBar">
            <div className="lineBar" style={{
                marginTop: 20,
                width: '100%',
                borderBottom: '1px solid #CC00FF'
            }} />
            <div className="lineRect" style={{
                position: 'absolute',
                marginTop: -10,
                marginLeft: 50,
                width: 5,
                height: 20,
                background: '#000',
                border: '1px solid #0FF'
            }}
            />
        </div>
    )
}

export default CalcBar;