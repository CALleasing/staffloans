import React from "react";
import 'antd/dist/antd.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./screen/Main";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand >รายการขอสินเชื่อ CAL LEASING</Navbar.Brand>
            {/* <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav> */}
          </Container>
        </Navbar>
      </header>
      <div className="App-header">

        <Main />
      </div>

    </div>
  );
}

export default App;
