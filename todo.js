const tasks = [];
let len = 0;
const input = document.getElementById('search');
const add = document.getElementById('add');
const allTasks = document.getElementById('tasks');
/* <i class="fa-solid fa-circle-xmark fa-lg" id="cancle"></i> */

function searchFunction() {

    if (input.value.trim() == "" || input.value.trim() == null || input.value.trim() == undefined) {
        add.style.display = 'none';
    } else {
        add.style.display = 'block';
    }
}

function addtoTask() {

    const div = document.createElement('div');
    div.id = len;
    div.classList.add('round');
    const checkbox = document.createElement('input');
    checkbox.id = `checkbox${len}`;
    checkbox.setAttribute('type', 'checkbox');
    const label = document.createElement('label');
    label.htmlFor = `checkbox${len}`;
    const span = document.createElement('span');
    span.innerText = input.value;
    const cancle = document.createElement('i');
    cancle.id = "cancle"
    const classesToAdd = ['fa-solid', 'fa-circle-xmark', 'fa-lg']
    cancle.classList.add(...classesToAdd);
    cancle.style.display = "none";
    const task = { id: div.id, name: input.value, status: 'incomplete' };
    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(span);
    div.appendChild(cancle);
    allTasks.appendChild(div);
    input.value = "";
    len++; 
    tasks.push(task);
    taskleft();
    checkbox.addEventListener('change', () => {
        const ind = tasks.findIndex(element => {
            return element.id == div.id;
        });
        if (event.target.checked) {
            div.style.boxShadow = "none";
            div.style.backgroundColor = "#d3d4de";
            span.style.textDecoration = "line-through";
            len--;
            tasks[ind].status = 'completed';
            taskleft();
        } else {
            div.style.boxShadow = "1px 1px 5px 1px";
            div.style.backgroundColor = "white";
            span.style.textDecoration = "none";
            len++;
            tasks[ind].status = 'incomplete';
            taskleft();
        }
    });

    div.addEventListener('mouseenter', () => {
        cancle.style.display = "block";
    });
    div.addEventListener('mouseleave', () => {

        cancle.style.display = "none";
    });

    cancle.addEventListener("click", () => {
        const ind = tasks.findIndex(element => {
            return element.id == div.id;
        });

        allTasks.removeChild(div);
        if (tasks[ind].status == 'incomplete') {
            len--;
            taskleft();
        }
        tasks.splice(ind, 1);
    });


}

input.addEventListener('keypress', () => {
    if (event.key === 'Enter') {

        if (input.value.trim() == "" || input.value.trim() == null || input.value.trim() == undefined) {
            input.value = "";
            return;
        } else {
            addtoTask();
        }
    }
});

add.addEventListener('click', () => {
    if (input.value.trim() == "" || input.value.trim() == null || input.value.trim() == undefined) {
        input.value = "";
        return;
    } else {
        addtoTask();
    }

});

function taskleft() {
    const lefttask = document.getElementById('remaining-task');
    lefttask.innerText = `${len} tasks left`;
}

const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    const complete = tasks.filter((task) => {
        if(task.status == 'completed'){
            allTasks.removeChild(document.getElementById(task.id));
            return task
        }    
    });
    complete.forEach(task => {
        let ind = tasks.findIndex(ind =>{
            return task.id == ind.id;
        });
        tasks.splice(ind,1);
    });
});

const all = document.getElementById('all');
all.addEventListener('click',() =>{
    tasks.forEach(task =>{
        let div = document.getElementById(task.id);
        div.style.display = 'block';
    });
});

const incomplete = document.getElementById('incomplete');
incomplete.addEventListener('click',() =>{
    let alldiv = document.createElement('div');
    tasks.forEach(task =>{
        let div = document.getElementById(task.id);
        if(task.status == 'completed'){
            
            div.style.display = 'none';
        }else{
            div.style.display = 'block';
        }
    });
});

const complete = document.getElementById('complete');
complete.addEventListener('click',() =>{
    let alldiv = document.createElement('div');
    tasks.forEach(task =>{
        let div = document.getElementById(task.id);
        if(task.status == 'incomplete'){
            
            div.style.display = 'none';
        }else{
            div.style.display = 'block';
        }
    });
});