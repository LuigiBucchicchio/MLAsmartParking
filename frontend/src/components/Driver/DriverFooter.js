import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Col, Container, Row } from "react-bootstrap";

const DriverFooter = () => {
  return (
    <div className="fixed-bottom">
      <Navbar color="dark" dark>
        <Container>
          <Navbar.Brand>Footer</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default DriverFooter;
