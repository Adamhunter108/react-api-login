# Notes: 📝
## Build a React app that consumes an API with authenication functionality


[React toolchain overviews](https://reactjs.org/docs/create-a-new-react-app.html)

Create React App will set up a React boilerplate.

Create React App requires Node 14 or higher.  To update node, use nvm (node version manager)
```bash
$ # check node version
$ node -v
$ # install latest version of node
$ nvm install node
$ # create react app
$ npx create-react-app <app-name>
$ # make sure it worked
$ # change into newly created app directory
$ cd <app-name>
$ # start development server
$ npm start
```
if that was successful, the react app will be available to view in a browser at: 
```bash
http://localhost:3000
```
or on any device on the network:
```bash
http://192.168.1.109:3000
```
Now is when I usually like to do some small customizations, like change out the favicon, change the page title in project-name/public/index.html, set up tests, get rid of the boilerplate CSS and the stock code in project-name/src/App.js.

Next I like to make the components and screens directories.  The screens are technically React components also, but it is good practice to stay as organized as possible.  When you have a lot of components and screens, this makes finding your files easier too.

```bash
$ # control + D (Mac/Linux) will stop the dev server
$ # change into the src directory
$ cd src
$ # create directories for components and screens
$ mkdir components screens
$ # change into new components directory
$ cd components
# create a JavaScript file for the header component
$ touch Header.js 
$ # change into new screens directory
$ cd ../screens 
# create JavaScript files for the Home, Login and Register screens
$ touch HomeScreen.js LoginScreen.js RegisterScreen.js
$ # change back to src directory
$ cd ..
$ # open the src folder
$ open .
```
I'm going to use [React Bootstrap](https://react-bootstrap.github.io/) components and a [Bootswatch](https://bootswatch.com/) theme.  

Download the bootstrap.min.css file from theme of your choice and add it to the src folder that we just opened.

Import the new CSS file in index.js:
```javascript
import './bootstrap.min.css'
```
That should have already themed the app.  

I like to make basic exported React functional components in the new screens and components so they aren't blank files.  Something as simple as this:

```javascript
import React from 'react'

function RegisterScreen() {
  return (
    <div>RegisterScreen</div>
  )
}

export default RegisterScreen
```

Now we can install React Bootstrap

```bash
$ # change to project root directory
$ cd ..
$ # install react bootstrap
$ npm install react-bootstrap
$ # start dev server again
$ npm start
```

Configure App.js with the HomeScreen and Header components, move it into a [React Bootstrap Container](https://react-bootstrap.netlify.app/components/navbar/#containers).  We are going to import it, add a JSX [main tag](https://www.w3schools.com/tags/tag_main.asp) to define the body, add some [Bootstrap padding](https://getbootstrap.com/docs/5.1/utilities/spacing/) to it, and then wrap the body in the Container:

```javascript
import { Container } from 'react-bootstrap'
import Header from './components/Header'

function App() {
  return (
    <div>
        <Header />
            <main className="py-3">>
                <Container>
                    <HomeScreen />
                </Container>
            </main>
    </div>
  );
}

export default App;
```
Since we already added the exported functional components to the Header and HomeScreen, we won't get an error with the dev server running and now we will see the changes immediately as we build them.

One thing that makes React apps so lightning fast is not reloading the app to navigate to another page.  This is accomplished by chamging regular href links to React Router links.  Since we are using React Bootstrap, we want to use react-router-bootstrap so our links will still be styled by the CSS. So we need to install both: 

```bash
$ # control + D will stop the dev server
$ # install react-router-dom
$ npm install react-router-dom
$ # install react-router-bootstrap
$ npm install react-router-bootstrap
$ # turn server back on
$ npm start
```
[React Router](https://reactrouter.com/docs/en/v6/getting-started/installation) v6 is the latest version and to set it up you need to add Routes and Route paths to App.js:

```javascript
import { Routes, Route, Link } from "react-router-dom";
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

function App() {
  return (
    <div>
    
      <Header />
      <main className="py-3">
        <Container>

          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="register" element={<RegisterScreen />} />
          </Routes>

          {/* <HomeScreen /> */}

        </Container>
      </main>
    
    </div>
  );
}

export default App;
```
And make a quick import and edit to index.js:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import './bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

Ok, let's finally get into Header.js.

Change the div to a header tag.  Grab some Navbar [code](https://react-bootstrap.netlify.app/components/navbar/) to customize.  I am using the off-canvas menu.  Change href links to Link Containers to get that SPA (single page application) feel.

To be able to use [Font Awesome Icons](https://fontawesome.com/icons):  Get the font-awesome [CDN](https://cdnjs.com/) link and add it to project-name/public/index.html and then just add the i tag where you want the icon.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
```
Header.js
```javascript
import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas'

function Header() {

  return (
    <header>
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
                    <Nav.Link><i class="fa-solid fa-house-chimney"></i>  Home</Nav.Link>
                </LinkContainer>

                <LinkContainer to='login'>
                    <Nav.Link><i class="fa-solid fa-skull"></i>  Log in</Nav.Link>
                </LinkContainer>

                </Nav>
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Offcanvas.Body>
            </Navbar.Offcanvas>
             </Container>
        </Navbar>

    </header>
  )
}

export default Header
```

Before we build out the LoginScreen and RegisterScreen, create FormContainer.js in src/components.

```javascript
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function FormContainer({ children }) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
```

Now we can use the FormContainer we just built along with React Bootstrap Form, Button, Row, Col, and Card components for the LoginScreen and RegisterScreen.

LoginScreen.js
```javascript
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

function LoginScreen({ location, history }) {

    return (
        <Card 
            className="text-center"
            >
        <FormContainer>
        <Card.Header as="h3"><i class="fa-solid fa-skull"></i> Sign In</Card.Header>
        <br />

            <Form>

                <Form.Group controlId='email'>
                    <Form.Label><i class="fas fa-envelope"></i> Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                    >
                    </Form.Control>
                </Form.Group>
                <br />

                <Form.Group controlId='password'>
                    <Form.Label><i class="fas fa-key"></i> Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                    >
                    </Form.Control>
                </Form.Group>
                <br />

                <Button type='submit' variant='dark'>Sign in</Button>

            </Form>

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
```

RegisterScreen.js
```javascript
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'


function RegisterScreen({ location, history }) {

    return (
        <Card 
            className="text-center"
            >
        <FormContainer>
            <Card.Header as="h3"><i class="fa-solid fa-skull"></i> Create An Account</Card.Header>
            <br />

            <Form>
            
                <Form.Group controlId='name'>
                    <Form.Label><i className="fas fa-user"></i> Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter Your Name'
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
                    >
                    </Form.Control>
                </Form.Group>
                <br />

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label><i class="fas fa-key"></i> Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
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
```

---
---

## Redux

### `Redux flow:`
* make constants
* make reducers with the constants:
    * state is changed through reducers
    * reducer functions manipulate and pass state down to components
    * functions that takes an action and the previous state of the application and returns the new state
    * create case statements with constants
* register the reducer with the store: 
    * in store.js, import the reducer and add to combineReducers()
* make actions: 
    * objects that represent the intention to change state
    * import costants again (these specify type for dispatch) and axios create dispatch functions and make api call
* add local storage object to initialState in store.js

[Redux](https://redux.js.org/), everybody's favorite state management tool.  I have an entire blog post about it which is mostly a high level introduction.  The blog post is about six months old and surprisingly not outdated already, feel free to check it out if this is new to you.

Redux is for managing global application state, not component state. User's data is a great use for Redux.  This way any components that need access to this data will have it available.  While Redux can be a bit complicated, there is a flow to it.  You make your constants, then reducers, register them in the store and then create actions.  But before that, we need to make some installs and set up the store.  

We obviously need to install Redux.  Since Redux is not React specific, we will need to install [React-Redux](https://react-redux.js.org/) to connect them.   We will also install [Redux-Thunk](https://www.npmjs.com/package/redux-thunk), which is middleware that allows for asynchronous requests from the actions to the Redux store.  

I also recomend [Redux Dev Tools Chrome extention](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en), which makes things a little easier to see.  In order to give the extention access to our Redux store, we will to install that too, [redux-devtools-extension](https://www.npmjs.com/package/redux-devtools-extension).  



```bash
$ # install redux
$ npm i redux
$ # install react-redux
$ npm i react-redux
$ # install redux-thunk
$ npm i redux-thunk
$ # install redux-devtools-extension
$ npm i redux-devtools-extension
```
Now we can create our Redux store.  Create src/store.js.  

```javascript
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// https://redux.js.org/api/api-reference

// reducers go in as key: value pairs
const reducer = combineReducers({})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
```

Next, add the store and the [Provider](https://react-redux.js.org/api/provider) component in index.js to make the store available.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from "react-router-dom";
import './index.css';
import './bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

Now prepare for the constants, reducers and actions by making directories for them.  This is optional but again, it is good to stay organized, especially if you plan on adding on to the application.

```bash
$ # make all three directories in the src directory
$ mkdir src/constants src/reducers src/actions
$ # in those new directories, create the JavaScript files
$ touch src/constants/userConstants.js src/reducers/userReducers.js src/actions/userActions.js
```

First lets get into the constants.  Defining these may seem a little pointless and a lot of developers ask why we do this.  According to the author of Redux and some helpful devs over at stackoverflow, defining constants this way helps minimize typos/bugs, keeps naming conventions consistent, helps with keeping track of scope and implementing new features because it is beneficial to see all existing actions in one place.

userConstants.js
```javascript
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'

export const USER_LOGOUT = 'USER_LOGOUT'

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'
```

userReducers.js
```javascript
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
 } from '../constants/userConstants'


 export const userLoginReducer = (state ={ }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}
```

Ok, now we are up to the actions where we get to call the [API](https://github.com/Adamhunter108/django-api-login).   To call the API, it has to be up and running.  Make sure you have that running on port 8000 in a separate terminal.  If you are using VS Code and using the built in terminals, you can color code them... if your'e into that sort of thing.

We will also be using [Axios](https://github.com/axios/axios) to call the API.  Axios is a promise based HTTP client for the browser and Node.js.  Axios is a lot like the built in JavaScript fetch() function except way more powerful.  It handles all HTTP request methods, has pretty simple syntax, has automatic JSON data transformation, ability to cancel requests and more.  Let's install it.

```bash
$ # in the node.js terminal
$ npm i axios
$ # turn node.js server back on
$ npm start
```

userActions.js
```javascript
import axios from 'axios'
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
 } from '../constants/userConstants'


 export const login = (email, password) => async (dispatch) => {
     try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login/',
            {'username': email, 'password': password},
            config
            )
        
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))

     } catch (error) {
        dispatch({ 
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
     }
 }
```

Since we are using localStorage for the user data, we need to update the store and get that data into the initialState:

store.js
```javascript
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducers'

// https://redux.js.org/api/api-reference

// reducers go in as key: value pairs
const reducer = combineReducers({
    userLogin: userLoginReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
```

And now back to add the functionality to LoginScreen.js.  We are going to use a few hooks here.  We will use the [useDispatch](https://react-redux.js.org/api/hooks#usedispatch) hook to send the email and password in the submitHandler of the form.  We will also use the [useEffect](https://reactjs.org/docs/hooks-effect.html) hook to perform the redirect back to the home screen once the submission is complete using the [useNavigate](https://reactrouter.com/docs/en/v6/api#usenavigate) hook from React Router.

LoginScreen.js
```javascript
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // this is how it has to be done now with React Router v6
    let navigate = useNavigate()

    useEffect(() => {
        if(userInfo){
            return navigate("/")
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

            <Form onSubmit={submitHandler}>
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
```

And since we are using React Router v6, we need to import and add this [Route](https://reactrouter.com/docs/en/v6/getting-started/tutorial#adding-a-no-match-route) to App.js so the useNavigate hook can work.

App.js
```javascript
<Route path="*" element={<Navigate to='/' replace />} />
```

Now we have successfully logged into our Django app via a brand new React frontend.  That is pretty cool.  This has officially become a full-stack project.  

Using the Redux hook [useSelector](https://react-redux.js.org/api/hooks#useselector), let's use that global state of the user's data and fix up the navigation and welcome our user and hide the login link.  Let's also give the user the option to logout using the useDispatch hook and the following action.  We will use some conditional logic for this.  We also already prepped for this and have the USER_LOGOUT constant.

Add the following to userActions.js
```javascript
 export const logout = () => (dispatch) => {
     localStorage.removeItem('userInfo')
     dispatch({ type: USER_LOGOUT })
 }
```

components/Header.js
```javascript
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { logout } from '../actions/userActions'

function Header() {

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
    <header>
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
                    <Nav.Link><i class="fa-solid fa-house-chimney"></i>  Home</Nav.Link>
                </LinkContainer>

            {/* if user is logged in show NavDropdown and Logout link, else show Login link */}
            {userInfo ? (
                <NavDropdown title={'Yo, ' + userInfo.name} id='username'>

                    <NavDropdown.Item onClick={logoutHandler}><i class="fas fa-sign-out-alt"></i> Logout</NavDropdown.Item>

                </NavDropdown>
            ): (
                <LinkContainer to='/login'>
                    <Nav.Link to="/login"><i class="fa-solid fa-skull"></i> Login</Nav.Link>
                </LinkContainer>
            )}

                </Nav>
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Offcanvas.Body>
            </Navbar.Offcanvas>
             </Container>
        </Navbar>

    </header>
  )
}

export default Header
```

Ok, let's wire up the RegisterScreen.  First we get into that Redux flow.  We already set the constants so let's make the reducer, add it to the store and then make the API call in actions.

Add the following to userReducers.js
```javascript
export const userRegisterReducer = (state ={ }, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}
```

Add that reducer function to the store:
Store.js
```javascript
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'

// reducers go in as key: value pairs
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})
```

And now the POST request to the API in userActions:
```javascript
 export const register = (name, email, password) => async (dispatch) => {
    try {
       dispatch({
           type: USER_REGISTER_REQUEST
       })

       const config = {
           headers:{
               'Content-Type': 'application/json'
           }
       }

       const { data } = await axios.post(
           'http://localhost:8000/api/users/register/',
           { 'name': name, 'email': email, 'password': password },
           config
           )

           dispatch({
               type: USER_REGISTER_SUCCESS,
               payload: data
           })

           dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

           localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
       dispatch({ 
           type: USER_REGISTER_FAIL,
           payload: error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
       })
    }
}
```

Now let's use the Redux hooks again to set the functionality of the RegisterScreen.  We also use the same useNavigate hook from React Router and the same useEffect hook that we used in the LoginScreen.
RegisterScreen.js
```javascript
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

    const userRegister = useSelector(state => state.userRegister)

    const { userInfo } = userRegister

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

            <Form onSubmit={submitHandler}>

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
```
If that worked, you should be able to register a new user and when you do, you should be redirected back to the HomeScreen.  Check the Nav to see if it is welcoming your new user.  You can also look inside the Redux dev tool to check the state and in the Users section of the Django admin dashboard at http://localhost:8000/admin/auth/user/.

Just gitignored this file.