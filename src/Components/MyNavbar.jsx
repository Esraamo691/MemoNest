import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";

export default function MyNavbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");

    navigate("/login");
  }
  return (
    <>
      <Navbar expand="lg" className="  bg-emerald-300 ">
        <Container>
          <Navbar.Brand href="#home">
            <h1 className="text-lg font-bold">
              Note <span className="text-[#f5fff8]">Ap</span>p
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button
                variant="outline-dark"
                onClick={handleLogout}
                className="btn border-2"
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
