import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Header from '../components/Header'


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
        <div>
            <Header />
            
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
            
                <Form.Group as={Row} controlId='name'>
                    <Form.Label column sm={1}><h4><i className="fas fa-user"></i></h4></Form.Label>
                    <Col>
                        <FloatingLabel label="Your name">
                            <Form.Control
                                required
                                type='name'
                                placeholder='Enter Your Name'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            >
                            </Form.Control>
                        </FloatingLabel>
                    </Col>
                </Form.Group>
                <br />

                <Form.Group as={Row} controlId='email'>
                    <Form.Label column sm={1}><h4><i class="fas fa-envelope"></i></h4></Form.Label>
                    <Col>
                        <FloatingLabel label="Email">
                            <Form.Control
                                required
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            >
                            </Form.Control>
                        </FloatingLabel>
                    </Col>
                </Form.Group>
                <br />

                <Form.Group as={Row} controlId='password'>
                    <Form.Label column sm={1}><h4><i class="fas fa-key"></i></h4></Form.Label>
                    <Col>
                        <FloatingLabel label="Password">
                            <Form.Control
                                required
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            >
                            </Form.Control>
                        </FloatingLabel>
                    </Col>
                </Form.Group>
                <br />

                <Form.Group as={Row} controlId='passwordConfirm'>
                    <Form.Label column sm={1}><h4><i class="fas fa-key"></i><i class="fas fa-key"></i></h4></Form.Label>
                    <Col>
                        <FloatingLabel label="Confirm Password">
                            <Form.Control
                                required
                                type='password'
                                placeholder='Enter Password Again'
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            >
                            </Form.Control>
                        </FloatingLabel>
                    </Col>
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
        </div>
    )
}

export default RegisterScreen