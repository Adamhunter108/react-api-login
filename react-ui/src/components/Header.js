import React from 'react'
// import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { logout } from '../actions/userActions'

function Header() {

    // clicking a link should probably close the offcanvas menu
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // https://react-redux.js.org/api/hooks#useselector-examples
    const userLogin = useSelector(state => state.userLogin)
    // destruct what is coming from the store to just grab userInfo
    const { userInfo } = userLogin 

    const dispatch = useDispatch()

    const logoutHandler = () => {
        // console.log('Logout')
        dispatch(logout())
    }
    

  return (
    <div>
        <Navbar bg="black" variant="dark" expand={false}>
            <Container fluid>
                <LinkContainer to='/'>
                    <Navbar.Brand>        
                        <img
                            alt=""
                            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/fire_1f525.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        App Name
                    </Navbar.Brand>
                 </LinkContainer>
                 <Navbar.Toggle aria-controls="offcanvasNavbar" />
                 <Navbar.Offcanvas 
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas Menu Title</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">

                <LinkContainer to='/'>
                    <Nav.Link><h4><i class="fa-solid fa-house-chimney"></i>  Home</h4></Nav.Link>
                </LinkContainer>


                {/* use Navbar.Text for text */}
                {/* <Navbar.Text>Yo {userInfo.name}, you are logged in</Navbar.Text> */}
                {/* {userInfo ? (
                    <Navbar.Text>Yo {userInfo.name}, you are logged in</Navbar.Text>

                ): (
                    <LinkContainer to='login'>
                    <Nav.Link><i class="fa-solid fa-skull"></i>  Log in</Nav.Link>
                </LinkContainer>
                )}

                {/* moved to conditional logic */}
                {/* <LinkContainer to='login'>
                    <Nav.Link><i class="fa-solid fa-skull"></i>  Log in</Nav.Link>
                </LinkContainer> */}


            {/* if user is logged in show NavDropdown and Logout link, else show Login link */}
            {userInfo ? (
                <NavDropdown title={'Yo, ' + userInfo.name} id='username'>

                    {/* <LinkContainer to='/profile'>
                        <NavDropdown.Item><i class="fas fa-address-card"></i> Profile</NavDropdown.Item>
                    </LinkContainer> */}

                    <NavDropdown.Item onClick={logoutHandler}><h4><i class="fas fa-sign-out-alt"></i> Logout</h4></NavDropdown.Item>

                </NavDropdown>
            ): (
                <LinkContainer to='/login'>
                    <Nav.Link to="/login"><h4><i class="fa-solid fa-skull"></i> Login</h4></Nav.Link>
                </LinkContainer>
            )}


                {/* <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                        Something else here
                    </NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
                {/* <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
            </Offcanvas.Body>
            </Navbar.Offcanvas>
             </Container>
        </Navbar>

    </div>
  )
}

export default Header


