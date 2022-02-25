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