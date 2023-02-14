import React, {useState} from "react";


function SearchBar({setKentekenHandler, setImageHandler}) {
    const [query, setQuery] = useState("6-XXH-68");
    const cleanSearch = () => setQuery("");
    function onFormSubmit(e) {
        e.preventDefault();
        setKentekenHandler(query);
        setImageHandler(query);
    }

    return (
        <span className="searchbar">
            <form onSubmit={onFormSubmit}>
                <input
                    type="search"
                    name="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onClick={cleanSearch}
                    placeholder="6-XXH-68"
                />
                <button
                    type="submit"
                    onSubmit={onFormSubmit}
                >
                send
                </button>
            </form>
        </span>
    )
}

export default SearchBar;