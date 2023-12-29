import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name : 'user',
  initialState : 'kim',
  reducers : {
    //state 수정해주는 함수
    changeName(state){
      return 'john ' + state
      //john kim
    }
  }
})

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    addCount(state, action){      
      let num = state.findIndex((a)=> a.id === action.payload )
      state[num].count++
    },
    addItem(state, action){
      state.push(action.payload)      
    },
    delItem(state, action){
      let index = state.findIndex((a)=> a.id === action.payload)
      console.log(index)
      state.splice(index, 1)
    }
  }
})

//수정함수 export
export let { changeName } = user.actions
export let { addCount, addItem, delItem } = cart.actions

export default configureStore({
  reducer: {
    user : user.reducer,
    cart : cart.reducer
  }
})