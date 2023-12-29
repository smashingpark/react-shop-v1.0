import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { changeName, addCount, delItem } from "../store";

function Cart(){
  let state = useSelector((state) => { return state })
  // console.log(cart)
  let dispatch = useDispatch()

  return (
    <div>
      {state.user}의 장바구니 <button onClick={()=>{
                  dispatch(changeName())
                }}>변경</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            state.cart.map((a, i)=>
              <tr key={i}>
                <td>{i}</td>
                <td>{state.cart[i].name}</td>
                <td>{state.cart[i].count}</td>
                <td>
                  <button onClick={()=>{ 
                    dispatch(addCount(state.cart[i].id))
                  }}>+</button>
                  &nbsp;
                  <button onClick={()=>{ 
                    // console.log(state.indexOf(state.cart[i]))
                    console.log(state.cart[i])
                    dispatch(delItem(state.cart[i].id))
                  }}>삭제</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;