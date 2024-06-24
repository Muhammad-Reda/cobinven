import React from "react";
import ButtonDefault from "./ui/ButtonDefault";

function Logout() {
    return (
        <div className="flex items-center justify-center ">
            <span>
                Berhasil Logout, Kembali ke halaman{" "}
                <ButtonDefault type="button" />
            </span>
        </div>
    );
}

export default Logout;
