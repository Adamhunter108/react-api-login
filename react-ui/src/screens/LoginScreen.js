import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    // const redirect = location.search ? location.search.split('=')[1] : '/'
    // const redirect = '/'

    const userLogin = useSelector(state => state.userLogin)
    // const { error, loading, userInfo } = userLogin
    const { userInfo } = userLogin

    // useEffect(() => {
    //     if(userInfo){
    //         history.push(redirect)
    //     }
    // }, [history, userInfo, redirect])

    // useEffect(() => {
    //     if(userInfo){
    //         history.push()
    //     }
    // }, [history, userInfo])



    // this is how it has to be done now with React Router v6

    let navigate = useNavigate();

    useEffect(() => {
        if(userInfo){
            return navigate("/");
        }
    }, [userInfo, navigate])


    const submitHandler = (event) => {
        event.preventDefault()
        // console.log('Submitted')
        dispatch(login(email, password))
    }

    return (
        <Card 
            className="text-center"
            >
        <FormContainer>
        <Card.Header as="h3"><i class="fa-solid fa-skull"></i> Sign In</Card.Header>
        <br />

            {/* {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />} */}

            <Form onSubmit={submitHandler}>
            {/* <Form> */}

                <Form.Group controlId='email'>
                    <Form.Label><i class="fas fa-envelope"></i> Email Address</Form.Label>
                    <Form.Control
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
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br />

                <Button type='submit' variant='dark'>Sign in</Button>
            
            </Form>
            {/* <Outlet /> */}

            <Row className='py-3'>
                <Col>
                    Don't have an account yet?  <Link to={'/register'}>Make one here.</Link>
                </Col>
            </Row>

        </FormContainer>
        </Card>
    )
}

export default LoginScreen
