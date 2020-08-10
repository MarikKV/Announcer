import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, saveUserInLocalStore, searchAnnounce } from '../actions';
import { firebase } from '../firebase';
import {Navbar, Nav, Form, Button, FormControl} from 'react-bootstrap';
import '../styles/Menu.scss';

export default function Menu() {

    const [search, setSearch] = useState('');
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();

    const logout = () => {
        firebase.auth().signOut(); 
        dispatch(login())
        dispatch(saveUserInLocalStore({}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchAnnounce(search))
        window.location = '#/Search'
    }
    
    return (
        <div className='menu'>
            <Navbar bg='primary' variant='dark' className='menuFixed' collapseOnSelect expand='lg' bg='dark'>
                <Navbar.Brand href="/">Announcer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {isLogged 
                    ? 
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#/Home">Home</Nav.Link>
                            <Nav.Link href="#/AllAnnounces">All announces</Nav.Link>
                            <Nav.Link href="#/MyAnnounces">My announces</Nav.Link>
                            <Nav.Link href="#/Messages">Messages</Nav.Link>
                            <Nav.Link href="#/About">About</Nav.Link>
                        </Nav>
                        <Form inline onSubmit={handleSubmit}>
                                <FormControl 
                                    type="text" 
                                    placeholder="Search" 
                                    className="mr-sm-2" 
                                    value={search} 
                                    onChange={ e => setSearch(e.target.value)}/>
                                <Button type="submit">Submit</Button>
                        </Form>
                        <Nav.Link href="" onClick={() => logout()} className='navLink'>Log Out</Nav.Link>
                    </Navbar.Collapse>
                    : 
                        <Navbar.Collapse className='justify-content-end'>
                            <Nav.Link href="#/SignIn" className='navLink'>Sign In</Nav.Link>

                        </Navbar.Collapse>
                }
            </Navbar>
        </div>
    )
}
