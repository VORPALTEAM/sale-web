import React from "react";

const DataHeading = (props: { h: string}) => {

    return(
        <h3 className="dataHeading">{props.h}</h3>
    )
}

export default DataHeading;