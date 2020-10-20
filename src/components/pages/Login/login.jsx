import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
// import cheval from "../../../assets/images/cheval.png";
import randonne from "../../../assets/images/randonne.png";
import Axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import NavBar  from"../../molecules/NavBar";
import LoginBtn from "../../atomes/LoginBtn"
// import submitBtn from "../../atomes/SubmitBtn"
require("./_login.scss");

export default function Login(props) {
  const { dispatch } = useContext(AuthContext);

  const history = useHistory();

  const [login, setLogin] = useState({
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  });

  const [errorForm, setErrorForm] = useState(" ");

  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLogin({
        ...login,
        email: "",
        password: "",
        isSubmitting: true,
      });

      const result = await Axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:8001/api/login",
        data: JSON.stringify(login),
      });
      if (result.status === 200) {
        return dispatch({ type: "LOGIN", payload: result }), history.push("./");
        // localStorage.setItem("token", res.data.token);
        // setLogin({ email: "", password: "" });
      }
    } catch (error) {
      console.log("error catch login", error.res);
      setLogin({
        ...login,
        isSubmitting: false,
        errorMessage: error.res,
      });
    }
  };


  return (
    <div className="ContainerLog media_phone">
      <div className="ContainerLog_header">Se connecter</div>
      <NavBar/>
      <div className="ContainerLog_content">
        <div className="ContainerLog_content_image">
          <img src={randonne} alt="cheval" />
        </div>
      </div>
      <form className="ContainerLog_form">
        <div
          className="ContainerLog_form"
          method="POST"
          action="/login"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <div className="ContainerLog_form_input">
          <input
            type="email"
            id="email"
            name="email"
            value={login.email}
            onChange={handleChange}
            required
          ></input>
        
        <div className="ContainerLog_form">
          <label type="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={login.password}
            onChange={handleChange}
            required
          ></input>
        </div>
        </div>
      </div>
      {/* <LoginBtn/> */}
      <button type="submit" onClick={handleSubmit}>valider</button>
      </form>
      <div className="ContainerLog_from_error">{errorForm}</div>
      {/* <div className="ContainerLog_from_bouton"> */}
        {/* <LoginBtn type="button" className="ContainerLog_from_btn" onClick={handleSubmit}>
          Se connecter
        </LoginBtn> */}
      
      {/* </div> */}

    
      
      <div class="ContainerLog_from_form-link">
        <a href="http://localhost:8001/">Mot de passe oublié ?</a> .
        <a href="http://localhost:8001/register">S'inscrire</a>
    </div>
    </div>
  );
}
