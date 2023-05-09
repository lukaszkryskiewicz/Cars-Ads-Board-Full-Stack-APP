import { NavLink } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";


const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" className="mt-4 mb-4 rounded">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Ads Board</Navbar.Brand>
        <Nav>
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/ad/add">Add Ad</Nav.Link>
          <Nav.Link as={NavLink} to="/register">Sign up</Nav.Link>
          <Nav.Link as={NavLink} to="/login">Sign in</Nav.Link>
          <Nav.Link as={NavLink} to="/logout">Sign out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar;