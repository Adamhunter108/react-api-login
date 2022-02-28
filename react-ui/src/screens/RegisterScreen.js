import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'


function RegisterScreen({ location, history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    // const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    // const { error, loading, userInfo } = userRegister
    const { userInfo } = userRegister

    // useEffect(() => {
    //     if(userInfo){
    //         history.push(redirect)
    //     }
    // }, [history, userInfo, redirect])


    let navigate = useNavigate();

    useEffect(() => {
        if(userInfo){
            return navigate("/");
        }
    }, [userInfo, navigate])


    const submitHandler = (event) => {
        event.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
        
    }

    return (
        <Card 
            className="text-center"
            >
        <FormContainer>
            <Card.Header as="h3"><i class="fa-solid fa-skull"></i> Create An Account</Card.Header>
            <br />

            {/* {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />} */}

            <Form onSubmit={submitHandler}>
            {/* <Form> */}
            
                <Form.Group controlId='name'>
                    <Form.Label><i className="fas fa-user"></i> Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter Your Name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        >
                    </Form.Control>
                </Form.Group>
                <br />

                <Form.Group controlId='email'>
                    <Form.Label><i class="fas fa-envelope"></i> Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        >
                    </Form.Control>
                </Form.Group>
                <br />

                <Form.Group controlId='password'>
                    <Form.Label><i class="fas fa-key"></i> Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br />

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label><i class="fas fa-key"></i> Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password Again'
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br />

                <Button type='submit' variant='dark'>Register</Button>

            </Form>

            <Row className='py-3'>
            <Col>
                Already have an account? <Link to={'/login'}>Sign in here.</Link>
            </Col>

            </Row>

        </FormContainer>
        </Card>
    )
}

export default RegisterScreen