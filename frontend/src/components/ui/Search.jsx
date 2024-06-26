import { CiSearch } from "react-icons/ci";

function Search({ placeholder, onchange, onClick }) {
    return (
        <div className=" xl:w-96">
            <div className="relative  flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                    placeholder={placeholder}
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    onChange={onchange}
                />

                {/* <!--Search icon--> */}

                <button
                    className=" rounded-full px-3 py-1.5 text-center text-base font-normal hover:bg-gray-100"
                    type="button"
                    onClick={onClick}
                >
                    <CiSearch />
                </button>
            </div>
        </div>
    );
}

export default Search;
