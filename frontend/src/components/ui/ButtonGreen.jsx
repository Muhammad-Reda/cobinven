import React from "react";

function ButtonGreen({ type, callback, content, text, text2 }) {
    return (
        <>
            <button
                onClick={callback}
                type={type}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex items-center"
            >
                {content}
                {text && <span className="ml-2">{text}</span>}
                {text2 && <span className="ml-2">{text2}</span>}
            </button>
        </>
    );
}

export default ButtonGreen;
