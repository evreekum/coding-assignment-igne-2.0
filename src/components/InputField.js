import React from "react";


function InputField({register, name, validationObject, id, type, placeholder, errors, onCLick}) {

    return (
        <>
            {errors[name] && <p className="error-message">{errors[name].message}</p>}
            <input
                {...register(`${name}`, validationObject)}
                id={id}
                type={type}
                placeholder={placeholder}
                onClick={onCLick}
            />

        </>
    )
}

export default InputField;