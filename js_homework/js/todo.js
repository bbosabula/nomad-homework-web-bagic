const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  console.log(li.id);
  li.remove();
  toDos = toDos.filter((item) => item.id !== parseInt(li.id)); 
  saveToDos();
}

function paintToDo(newToDoObj) {
  const list = document.createElement("li");
  list.id= newToDoObj.id;
  const span = document.createElement("span");
  const delteBtn = document.createElement("button");
  delteBtn.innerText = "❌";
  delteBtn.addEventListener("click", deleteToDo);
  list.appendChild(span);
  list.appendChild(delteBtn);
  span.innerText = newToDoObj.text;
  toDoList.appendChild(list);

}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(toDo => {
    paintToDo(toDo);
  });
}