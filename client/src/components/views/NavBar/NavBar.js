import { NavLink } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";


const NavBar = () => {
  const user = useSelector(getUser);

  return (
    <Navbar expand='md' collapseOnSelect bg="dark" variant="dark" className="mt-4 mb-4 rounded">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Cars Advertising Board</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
          <Nav className='align-items-center'>
            <Nav.Link eventKey={1} as={NavLink} to="/">Home</Nav.Link>
            {user && <Nav.Link eventKey={2} as={NavLink} to="/ad/add">Add Ad</Nav.Link>}
            {user && <Nav.Link eventKey={6} as={NavLink} to="/myAds">My Ads</Nav.Link>}
            {!user && <Nav.Link eventKey={3} as={NavLink} to="/register">Sign up</Nav.Link>}
            {!user && <Nav.Link eventKey={4} as={NavLink} to="/login">Sign in</Nav.Link>}
            {user && <Nav.Link eventKey={5} as={NavLink} to="/logout">Sign out</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;