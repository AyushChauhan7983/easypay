import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ Component }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const flag = sessionStorage.getItem("flag");
        if (flag !== "true") {
            navigate("/login");
        }
    }, [navigate]);

    return <Component />;
};

export default Protected;
