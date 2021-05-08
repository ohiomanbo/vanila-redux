import { createStore } from "redux"

const form = document.querySelector("form")
const input = document.querySelector("input")
const ul = document.querySelector("ul")

const ADD_TODO = "ADD_TODO"
const DELETE_TODO = "DELETE_TODO"

// object를 반환하는 action creator 함수. dispatch를 통해 reducer의 action으로 보내짐
const addToDo = text => {
  return {
    type : ADD_TODO,
    text
  }
} // dispatchDelToDo 의 store.dispatch의 액션 부분을 작은 함수로 쪼개본 것(add.ver)

const reducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case ADD_TODO: // mutate(원형 변형)하지 말고, new object(state) 리턴하기
      return [ {text :action.text, id : Date.now()}, ...state ] // Q. 그냥 action.text 더하는거랑 무슨 차이지?
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id) // new state 리턴
    default:
      return state
  }
};

const store = createStore(reducer)

store.subscribe( () => console.log(store.getState()))

// 이 function은 오직 action을 dispatch하기 위한 용도
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text)) // dispatch 에 액션과 함께 전달할 내용 전달
}

const dispatchDelToDo = e => {
  e.preventDefault()
  console.log(e.target.parentNode.id) // 삭제할 부모 노드의 id 값을 알려고

  const id = parseInt(e.target.parentNode.id) // string 이므로 Int로 변형
  store.dispatch({type: DELETE_TODO, id}) // 이러한 액션을 return 하도록 reduecer 위에 function을 만들기도 함(ex. addToDo), 여기서 reducer에서 사용할 action.id를 넘김
}

const paintTodos = () => {
  const toDos = store.getState() // 매번 업데이트 될때 마다 getState 불러오므로,
  ul.innerHTML = "" // 리스트 클리어 해줌
  toDos.forEach(toDo => { // toDos의 각 항목마다 li를 만들어서 ul의 자식으로 추가

    const li = document.createElement("li")
    const btn = document.createElement("button")

    li.id = toDo.id
    li.innerText = toDo.text
    ul.appendChild(li)

    btn.innerText = "DEL"
    li.appendChild(btn)
    btn.addEventListener("click", dispatchDelToDo)
  })
} // 큰 규모에서는 느려지거나, 점프될 수 있으므로 리액트로 구현하는게 좋음

store.subscribe(paintTodos) // todo의 변화에 따라 list를 repaint


const onSubmit = e => {
  e.preventDefault()
  const toDo = input.value
  input.value = "" // input clear
  dispatchAddToDo(toDo)
}

form.addEventListener("submit", onSubmit) // form 자체에다가 listner 줘도 정상작동하네?