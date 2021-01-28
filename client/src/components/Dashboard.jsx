import React, { Fragment, useEffect, useState } from "react";

function Dashboard({ setAuth }) {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  const onLogOut = (e) => {
    e.preventDefault();
    setAuth(false);
    localStorage.removeItem("token");
  };

  return (
    <Fragment>
      <h1>Welcome {name}</h1>
      <button
        className="btn btn-primary btn-block"
        onClick={(e) => onLogOut(e)}
      >
        Logout
      </button>
    </Fragment>
  );
}

export default Dashboard;
