import React, { useState, useEffect } from "react";
import 'antd/dist/antd.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Modal, Input, Button } from "antd";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./screen/Main";

function App() {
  let MAIN_URL = 'https://cal-assessment-api.herokuapp.com'
  const [loginState, setLoginState] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [visible, setVisible] = useState(true);
  const [loading, setLoaing] = useState(false);

  // useEffect(() => {
  //   setLoginState(localStorage.getItem('login_state'));

  // }, []);

  const login = async () => {
    // setConfirmLoading(true)
    setLoaing(true);
    console.log('LOGIN')
    let object = {
      userid: userName,
      password: password
    }
    await axios.post(MAIN_URL + '/login', object)
      .then(res => {
        console.log(res.data)

        if (res.data.department === 'IT') {
          setUser(res.data)
          setLoginState(true)
          setVisible(false)
          setLoaing(false);
          // localStorage.setItem('login_state', true);
          // localStorage.setItem('user', res.data);

        } else {
          alert('ขออภัย... คุณไม่มีสิทธิ์ในการใช้งาน')
          setLoaing(false);
        }

      }).catch(e => {
        alert('ขออภัย... คุณไม่มีสิทธิ์ในการใช้งาน')
        setLoaing(false);
        console.error(e);
      });
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('do validate')
    }
  }

  return (
    !loginState ?
      <Modal
        title="เข้าสู่ระบบ"
        visible={visible}
        // confirmLoading={confirmLoading}
        footer={<Button loading={loading} onClick={() => { login() }}> เข้าสู่ระบบ</Button>}
      // confirmLoading={confirmLoading}

      >
        <Input style={{ margin: 4 }} placeholder="ชื่อผู้ใช้"
          onPressEnter={() => {
            console.log('enter')
            login();
          }}
          onChange={(e) => {
            setUserName(e.target.value);
          }} />
        <Input.Password style={{ margin: 4 }} placeholder="รหัสผ่าน"
          onPressEnter={() => {
            console.log('enter')
            login();
          }}
          onChange={(e) => {
            setPassword(e.target.value);

          }} />
      </Modal>

      :

      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand >รายการขอสินเชื่อ CAL LEASING</Navbar.Brand>

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
