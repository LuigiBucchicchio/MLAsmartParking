import { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Col, Container, Row } from "react-bootstrap";

import classes from './Header.css'

const HeaderDriver = (props) => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Row>
            <Nav fill className="ml-auto">
              <Col sm={5}>
                <Nav.Item>
                  <Nav.Link as={Link} to="/">
                    {" "}
                    <img
                      alt=""
                      src="../../assets/favicon.ico"
                      height="30"
                      width="30"
                      className="d-inline-block align-top"
                    />{" "}
                    MLA Smart Parki
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col sm={4}>
                <Nav.Item>
                  <NavDropdown title="Select view" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/policeman">
                      Policeman
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/driver">
                      Driver
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/municipality">
                      Municipality
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav.Item>
              </Col>
              <Col sm={4}>
                <Nav.Item>
                  <Nav.Link as={Link} to="/admin">
                    Admin Page
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col sm={4}>
                <Nav.Item>
                  <Nav.Link as={Link} to="/profile">
                    Profile Page
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col sm={4}>
                <Nav.Item onClick={props.logout} className={classes.logout_btn}>
                <Nav.Link >
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </Col>
            </Nav>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderDriver;
