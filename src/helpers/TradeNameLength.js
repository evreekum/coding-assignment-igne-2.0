import React from "react";

function TradeNameLength(tradeName) {
    if (tradeName.length < 15) {
        return tradeName
    } else {
        return tradeName.substring(0, 15);
    }
}

export default TradeNameLength;