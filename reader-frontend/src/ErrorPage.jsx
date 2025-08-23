import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div>
            <h1> Oh no, this route doesn't exist! </h1>
            <Link to="/">
                Go back to the home page
            </Link>
        </div>
    )
}

export default ErrorPage;