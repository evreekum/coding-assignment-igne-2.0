import React, {useState} from "react";
import InputField from "../InputField";
import {useForm} from "react-hook-form";


function SearchBar({setKentekenHandler, setImageHandler}) {
    const [query, setQuery] = useState("6-XXH-68");
    const {handleSubmit, register, formState: {errors}} = useForm()
    const cleanSearch = () => query("");

/*    function onFormSubmit(e) {
        e.preventDefault();
        setKentekenHandler(query);
        setImageHandler(query);
    }*/

    function onFormSubmit(query) {
        setKentekenHandler(query);
        setImageHandler(query);

    }


    return (
        <span className="searchbar">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <label htmlFor="numberPlateInput"><h1>Please enter your license plate number</h1>
                    <div className="input-container">
                    {/*<input*/}
                    {/*    id="numberPlateInput"*/}
                    {/*    type="search"*/}
                    {/*    name="search"*/}
                    {/*    value={query}*/}
                    {/*    onChange={(e) => setQuery(e.target.value)}*/}
                    {/*    onClick={cleanSearch}*/}
                    {/*    placeholder="6-XXH-68"*/}
                    {/*/>*/}
                        <InputField
                            register={register}
                            name="query"
                            validationObject={{
                                required: "Fill in a valid license plate number",
                                pattern: {
                                    value: /^(?=.*[0-9])(?=.*[A-Z])$/i,
                                    message: "Invalid license plate number. Please try again."
                                }
                        }
                            }
                            id="numberPlateInput"
                            type="search"
                            placeholder="6-XXH-68"
                            errors={errors}
                            onCLick={cleanSearch}
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