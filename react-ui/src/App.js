// import { HashRouter as Router, Route } from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes, Route } from "react-router-dom";
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
