import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Permintaan tidak dapat ditemukan.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;
