import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Main: React.FC = () => {
    return ( 
    <div className="mainpage">
    <Link to="/login">
    <Button type="primary" id="login">Login</Button>
    </Link>

    <Link to="/employee">
    <Button type="primary" id="post">Post Data</Button>
    </Link>

    <Link to="/table">
    <Button type="primary" id="get">Get Data</Button>
    </Link>

    <Link to="/form">
    <Button type="primary" id="get">Get</Button>
    </Link>
    </div>
    );

};
    
    export default Main;