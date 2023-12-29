import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { addItem } from "../store";
import { useDispatch } from "react-redux";

function Detail(props) {
  let {id} = useParams();
  let i = props.shoes.find(x => x.id == id);
  let [count, setCount] = useState(0)
  let [evenbanner, setEvenbanner] = useState(true)
  let [num, setNum] = useState(0)
  let [tab, setTab] = useState(0)
  let [fadeout, setFadeout] = useState('')
  let [fadein, setFadein] = useState('')
  let dispatch = useDispatch()

  useEffect(()=>{
    setTimeout(()=>{
      setFadein('ani-fadein-end')
    }, 200)
    return ()=> {
      setFadein('')
    }
  },[])

  useEffect(()=>{
    setTimeout(()=>{
      setFadeout('ani-fadeout-end')
    }, 1000)
    setTimeout(()=>{
      let a = setEvenbanner(false);
      console.log(1);

      return ()=> {
        clearTimeout(a)
      }
    }, 2000)
  }, [count])

  useEffect(()=>{
    if (isNaN(num) == true) {
      alert('숫자만 입력하세요');
    }
  }, [num])

  return (
    <div className={`container ani-fadein-start ${fadein}`}>
      {
        evenbanner == true ? <div className={`alert alert-warning ani-fadeout-start ${fadeout}`}>2초 후에 사라짐</div> : null
      }
      {count}
      <button onClick={()=>{setCount(count+1)}}>button</button>


      <div className="row">
        <div className="col-md-6">
        <img src={process.env.PUBLIC_URL + '/shoes' + (i.id+1) +'.jpg'} width={"80%"} />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{i.title}</h4>
          <p>{i.content}</p>
          <p>{i.price}</p>
          <p><input type="text" onChange={(e)=>{
            setNum(e.target.value)
            }} placeholder="수량입력" /></p>
          <button onClick={()=>{
            dispatch(addItem( {id : i.id, name : i.title, count : num} ))
            }} className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">Tab0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">Tab1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">Tab2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContents tab={tab} shoes={props.shoes} />
    </div>
  );
}

function TabContents({tab, shoes}){
  let [fadein, setFadein] = useState('')

  useEffect(()=>{
    setTimeout(()=>{
      setFadein('ani-fadein-end')
    }, 100)
    return ()=>{
      setFadein('')
    }
  }, [tab])
  // if (tab == 0) {
  //   return <div>내용0</div>
  // } else if (tab == 1) {
  //   return <div>내용1</div>
  // } else if (tab == 2) {
  //   return <div>내용2</div>
  // }
  return (<div className={`ani-fadein-start ${fadein}`}>
    { [<div>{shoes[0].title}</div>, <div>{shoes[1].title}</div>, <div>{shoes[2].title}</div>][tab] }
  </div>)
}

export default Detail;