import * as MdIcons from "react-icons/md";

const Top = ({ textKiri, textKanan }) => {
    return (
        <div className="mt-2 w-full px-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-md">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-md text-center p-3">
                                {textKiri}
                                {textKanan}
                            </h5>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className=" p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full">
                                <MdIcons.MdDashboard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Top;
