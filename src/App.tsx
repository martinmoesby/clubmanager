import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IUser } from 'model/User';
import * as AuthService from 'services/auth.service';
import { Link, Route, Routes } from 'react-router-dom';
import Home from 'components/Home';
import Login from 'components/Login/Login';
import Register from 'components/Login/Register';
import Profile from 'components/Login/Profile';
import WeatherPublic from 'components/Weather/WeatherPublic';
import WeatherSecret from 'components/Weather/WeatherSecret';
import WeatherAdmin from 'components/Weather/WeatherAdmin';

const App:React.FC = () => {

  const [showAdminWeather, setShowAdmin] = useState<boolean>(false);
  const [showSecretWeather, setShowSecret] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser|null>(null);

  useEffect(()=> {
    const user = AuthService.getCurrentUser();
    console.log(user);
    
    if (user) {
      setCurrentUser(user);
      setShowSecret(true);
      setShowAdmin(user.roles.includes("Admin"));
    }

  },[]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
    setShowAdmin(false);
    setShowSecret(false);
  }

  return (<React.Fragment>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          bezKoder
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {showSecretWeather && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Secret Weather
              </Link>
            </li>
          )}
          {showAdminWeather && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Weather
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<WeatherPublic />} />
          <Route path="/mod" element={<WeatherSecret />} />
          <Route path="/admin" element={<WeatherAdmin />} />
        </Routes>
      </div>
  </React.Fragment>

  );
}

export default App;
