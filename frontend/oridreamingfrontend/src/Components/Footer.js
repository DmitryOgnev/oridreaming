import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => (
    <Container fluid style={{backgroundColor: '#212529', color: '#fff'}}>
        <Container style= {{displey: 'flex', justifyContent: 'center', padding: '10px'}}>
            <p>Web Developer Blog</p>
        </Container>
    </Container>

)

export default Footer;