import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bg from './img/bg.png';
import data from './data.js';
import Detail from './routes/detail.js';
import { Button, Navbar, Container, Nav, Row, Col, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Cart from './routes/Cart.js';

function App() {
  let [shoes, setShoes] = useState(data);
  let [datajson] = useState([axios.get('https://codingapple1.github.io/shop/data2.json'), axios.get('https://codingapple1.github.io/shop/data3.json')])
  let [count, setCount] = useState(0);
  let [disabled, setDisabled] = useState(false);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(()=>{
    count+1 > datajson.length && setDisabled(true)
    // console.log(count)
  },[count])


  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          
          <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>홈</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/event')}}>Event</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<div>
          <div className="main-bg"></div>
            <Container>
              <Row>
                {
                  shoes.map((a, i)=>{
                    return (
                      <Product key={i} shoes={shoes[i]} i={i} navigate={navigate} />
                    )
                  })
                }
              </Row>

              {
                loading == true ? <Spinner animation="border" variant="primary" /> : null
              }
              {
              // 버튼 클릭 시, 데이터가 더이상 없을 때 alert을 띄워주는 코드↓↓
              /* <button onClick={()=>{
                setCount(count+1);                
                datajson[count] == null ? alert('더이상 상품이 없습니다.') :
                datajson[count].then((result)=>{
                  console.log(count)
                  console.log(result.data)
                  console.log(shoes)
                  let copy = [...shoes, ...result.data]
                  setShoes(copy)
                })
                .catch(()=>{ 
                  console.log('데이터 전송 실패')
                })
              }}>more</button> */}             
              
              {/* 데이터가 더이상 없을 때 버튼을 비활성화 시키는 코드↓↓ 
                  상단 useEffect()와 함께 사용
                  + 로딩바 추가 
              */}
              <button disabled={disabled} onClick={()=>{
                datajson[count]
                // [axios.get('https://codingapple1.github.io/shop/data2.json'), axios.get('https://codingapple1.github.io/shop/data3.json')][count]
                .then((result)=>{
                  setLoading(true)
                  console.log(count)
                  console.log(result.data)
                  console.log(shoes)
                  let copy = [...shoes, ...result.data]
                  setShoes(copy)
                  setLoading(false)
                  setCount(count+1)
                  console.log(count)
                  })
                  .catch(()=>{ 
                    setLoading(false)
                    console.log('데이터 전송 실패')
                  });                   
              }}>more</button>
            </Container>
        </div>} />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />

        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        <Route path="/event" element={<EventPage />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일 기념 쿠폰 받기</div>} />
        </Route>
        <Route path="*" element={<div>없는 페이지에요</div>} />
        <Route path="/cart" element={<Cart />} />
        
      </Routes>

      
    </div>
  );
}

function EventPage() {
  return (
    <>
      <h2>오늘의 이벤트</h2>
      <Link to="/event/one/">첫번째</Link>&nbsp;
      <Link to="/event/two/">두번째</Link>
      <Outlet></Outlet>
    </>
  )
}

function About() {
  return (
    <>
      <h2>회사정보</h2>
      <Link to="/about/member/">멤버소개</Link>&nbsp;
      <Link to="/about/location/">회사위치</Link>
      <Outlet></Outlet>
    </>
  )
}

function Product(props) {  
  return (
    <Col style={{cursor: 'pointer'}} onClick={()=>{props.navigate('/detail/'+props.shoes.id)}}>
      <img src={process.env.PUBLIC_URL + '/shoes' + (props.i+1) +'.jpg'} width={"80%"} />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </Col>
  )
}

export default App;
