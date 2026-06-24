import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

    const userInfo = JSON.parse(
        localStorage.getItem("user")
    );

    if (!userInfo) {

        return (
            <Navigate to="/login" />
        );

    }

    if (userInfo.role !== "admin") {

        return (
            <Navigate to="/" />
        );

    }

    return children;

}

export default AdminRoute;