import React from "react";
import FormatDate from "../../helpers/FormatDate";

function Main({objectKeys, className, foundBrand, foundTradeName, foundDate, foundFuel }) {

    return (
        <main className="main-container">
            {Object.keys({objectKeys}).length > 0 &&
                <div className={className}>
                    <div>
                        <h4>trade name</h4>
                        <h2>{foundBrand} {foundTradeName}</h2>
                    </div>
                    <div>
                        <h4>date of first admission</h4>
                        <h2>{FormatDate({foundDate})}</h2>
                    </div>
                    <div>
                        <h4>fuel description</h4>
                        <h2>{foundFuel}</h2>
                    </div>
                </div>
            }
        </main>
    )
}

export default Main;
