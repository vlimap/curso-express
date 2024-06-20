import React from 'react';
import { Container } from 'react-bootstrap';
import './footer.css'

const Footer = () => {
    return (
        <footer className='bg-dark text-white'>
            <Container>
                &copy; { new Date().getFullYear()} Todos os direitos reservados.
            </Container>
        </footer>
    );
}

export default Footer;