import React, {useState} from "react";


function SearchBar({setKentekenHandler, setImageHandler}) {
    const [query, setQuery] = useState("6-XXH-68");
    // let regex = /^[A-Z]{2}-\d{4}-[A-Z]{2}/gi;
    // let regex = "/^((([0-9]{3}(?![0-9]))|([a-z]{3}(?![a-z])))|(([0-9]{1,2})|([a-z]{1,2}))|-){6,}"
    const cleanSearch = () => setQuery("");

    function onFormSubmit(e) {
        e.preventDefault();
        setKentekenHandler(query);
        setImageHandler(query);

    }

    return (
        <span className="searchbar">
            <form onSubmit={onFormSubmit}>
                <label htmlFor="numberPlateInput"><h1>Please enter your license plate number</h1>
                    <div className="input-container">
                    <input
                        id="numberPlateInput"
                        type="search"
                        name="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onClick={cleanSearch}
                        placeholder="6-XXH-68"
                        alt="Type a license plate number"
                        // pattern={regex}
                        // title="Fill in a valid license plate number. It must contain a combination of numbers and letters"
                    />
                    <button
                        type="submit"
                        onSubmit={onFormSubmit}
                    >
                    send
                    </button>
                    </div>
                </label>
            </form>
        </span>
    )
}

export default SearchBar;