import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Col, Container, Row } from "react-bootstrap";

import logo from "../../assets/logo.png"
import classes from './Header.css'


const Header = (props) => {
  const roleUser = () => {
    console.log(props.loggedRole)
  }
  
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Row>
            {roleUser}
            <Nav fill className="ml-auto">
              <Col sm={10}>
                <Nav.Item>
                  <Nav.Link as={Link} to="/">
                    {" "}
                    <img
                      alt=""
                      src={logo}
                      height="30"
                      width="60"
                      className="d-inline-block align-top"
                    />{" "}
                    MLA Smart Parking
                  </Nav.Link>
                </Nav.Item>
              </Col>
              <Col sm={10}>
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

export default Header;