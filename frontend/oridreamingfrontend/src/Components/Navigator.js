import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function NaviBar() {

const [show, setshow] = useState(false);

const handleClose =() => setshow(false)
const handleShow =() => setshow(true)

    return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>OriDreaming</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link><Link to="/">Home</Link></Nav.Link>
                <Nav.Link><Link to="/users">Users</Link></Nav.Link>
                <Nav.Link><Link to="/about">About</Link></Nav.Link>
            </Nav>
            <Nav>
                <Button varient="primary" className="mr-2" onClick={handleShow}>Log In</Button>
                <Button varient="primary" onClick={handleShow}>Sign out</Button>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="fromBasicPassword">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">We'll never share your email</Form.Text>
                </Form.Group>
                <Form.Group controlId="fromBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />

                </Form.Group>
                <Form.Group controlId="fromBasicCheckbox">
                    <Form.Label>Password</Form.Label>
                    <Form.Check type="checkbox" label="Remeber me"/>

                </Form.Group>

            </Form>
        </Modal.Body>
    </Modal>
    </>
    )
}