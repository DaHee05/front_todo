const host = "http://127.0.0.1:8080";
const todosContainer = document.querySelector('.todos-container');

function getTodos() {
    axios.get(`${host}/todo`)  //``안 ${}는 변수 추가
        .then(response => {
            console.log(response.data);
            renderTodos(response.data.todos);
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
}


function renderTodos(todos) {
    todosContainer.innerHTML= ''; // todosContainer 초기화
    todos.forEach(todo =>{
        const todoDiv= document.createElement('div');
        todoDiv.classList.add('todo-item');
        todoDiv.textContent= todo.item;
        todosContainer.appendChild(todoDiv);

        // 삭제 버튼 생성 및 이벤트 처리
        const deleteBtn= document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent= 'x';

        deleteBtn.addEventListener('click', function () {
            deleteTodo(todo.id);
        });
        
        // todoDiv에 삭제 버튼 추가
        todoDiv.appendChild(deleteBtn);
    });
}

window.addEventListener('DOMContentLoaded', function () {
    getTodos();
})

const todoInput = document.querySelector('.todo-input');
todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const title = todoInput.value.trim(); // 앞뒤공백제거
    let todoData =  {
        id:0,
        item: title
    };
    if (title === '') return; //아무내용없는거 거르기
 
    axios.post(`${host}/todo`, todoData)
        .then(response => {
            todoInput.value = ''; //값 입력하는 칸 엔터 누르면 내용 사라짖ㅁ
            getTodos(); //리스트 추가 보여주기 
        })
        .catch(error => {
            console.error('Error adding todo:', error);
        });
}

function deleteTodo(todoId) {
    axios.delete(`${host}/todo/${todoId}`)
        .then(function (response) {
            console.log('Todo deleted:', response.data);
            getTodos();
        })
        .catch(function (error) {
            console.error('Error deleting todo:', error);
        });
}
    
