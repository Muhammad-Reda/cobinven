import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";

function Pagination({ callback }) {
    return (
        <div className="py-2 w-max">
            <nav className="block">
                <ul className="flex pl-0 rounded list-none flex-wrap">
                    <li className="ml-2">
                        <button
                            type="button"
                            onClick={callback}
                            href="#pablo"
                            className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-black"
                        >
                            <LuChevronFirst />
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={callback}
                            href="#pablo"
                            className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-black"
                        >
                            <IoChevronBack />
                        </button>
                    </li>
                    <li>
                        <a
                            href="#pablo"
                            className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-black"
                        >
                            1
                        </a>
                    </li>
                    <li>
                        <a
                            href="#pablo"
                            className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-black"
                        >
                            2
                        </a>
                    </li>
                    <li>
                        <a
                            href="#pablo"
                            className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-black"
                        >
                            3
                        </a>
                    </li>
                    <li>
                        <a
                            href="#pablo"
                            className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-black"
                        >
                            4
                        </a>
                    </li>
                    <li>
                        <a
                            href="#pablo"
                            className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-black"
                        >
                            5
                        </a>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={callback}
                            href="#pablo"
                            className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-black"
                        >
                            <IoChevronForward />
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={callback}
                            href="#pablo"
                            className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 bg-white text-black"
                        >
                            <LuChevronLast />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
