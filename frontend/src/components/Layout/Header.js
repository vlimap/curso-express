import React from 'react';
import './Header.css';
import { Container, Navbar, Nav} from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg='dark' >
            <Container>
                <Navbar.Brand href="/">Meu site</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <nav className='ml-auto text-white'>
                        <Nav.Link href="/"> Home </Nav.Link>
                        <Nav.Link href="/about"> About </Nav.Link>
                        <Nav.Link href="/contact"> Contact </Nav.Link>
                    </nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;