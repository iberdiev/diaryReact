import React, { Component } from 'react'
// import { Navbar, Nav, NavItem } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

import { Fragment } from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

export default class CustomNavbar extends Component {
    logout = event => {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user_role');
        window.location.href = "/";
    }
  render() {
    const token = localStorage.getItem('token');
    return (
      <header>
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
          <nav className="navbar navbar-expand-lg navbar-light bg-white">
              <a className="navbar-brand" href="#">Дневник</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            
              <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Главная</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Ссылка</a>
                  </li>
                </ul>
                
              </div>
            </nav>
      </header>
    )
  }
}
// <Navbar default collapseOnSelect>
//   <Navbar.Header>
//     <Navbar.Brand>
//       <Link to="/">Онлайн Дневник</Link>
//     </Navbar.Brand>
//     <Navbar.Toggle />
//   </Navbar.Header>
//   <Navbar.Collapse>
//     <Nav pullRight>
//       <NavItem eventKey={1} componentClass={Link} href="/" to="/">
//         Профиль
//       </NavItem>
//       <NavItem eventKey={2} componentClass={Link} href="/about" to="/about">
//         Оценки
//       </NavItem>
//       <NavItem eventKey={3} componentClass={Link} href="/news" to="/news">
//         Расписание
//       </NavItem>
//     </Nav>
//   </Navbar.Collapse>
// </Navbar>
