import { NavLink } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";


const NavBar = () => {
  const user = useSelector(getUser);

  return (
    <Navbar bg="dark" variant="dark" className="mt-4 mb-4 rounded">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Car Advertising Board</Navbar.Brand>
        <Nav>
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          {user && <Nav.Link as={NavLink} to="/ad/add">Add Ad</Nav.Link>}
          {!user && <Nav.Link as={NavLink} to="/register">Sign up</Nav.Link>}
          {!user && <Nav.Link as={NavLink} to="/login">Sign in</Nav.Link>}
          {user && <Nav.Link as={NavLink} to="/logout">Sign out</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar;