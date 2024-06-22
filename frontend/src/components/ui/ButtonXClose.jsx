import { IoIosClose } from "react-icons/io";

function ButtonXClose({ callback }) {
    return (
        <button
            className="p-1 ml-auto bg-transparent border-0 text-black opacity-60 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={callback}
        >
            <IoIosClose />
        </button>
    );
}

export default ButtonXClose;
