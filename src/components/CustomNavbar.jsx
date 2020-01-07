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
        <Fragment>
            <Navbar color="faded" light expand="md">
              <NavbarBrand href="/">
                Онлайн Дневник
              </NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="/">Главная</NavLink>
                </NavItem>
                {token ?
                (<NavItem className="d-flex align-items-center">
                  <NavLink onClick={this.logout} className="font-weight-bold">
                    Выйти
                  </NavLink>
                </NavItem>) : null }


              </Nav>
              </Navbar>
        </Fragment>
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
