import React from "react";

function FormatDate(date) {

    const dateArray = date.split("-");
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
}

export default FormatDate;