// anchors
const reset = document.querySelector(".app__refreshicon");
const list = document.getElementById("list");
const input = document.getElementById("input");

// toggle classes
const doneIcon = "fas";
const undoneIcon = "far";
const doneLine = "checked";

// function essentials
let taskList = [];
let id = 0;

//clear 
reset.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
})

// to-do
function addTask(task, id, done, remove) {

    if (remove) {
        return;
    }

    const isDone = done ? doneIcon : undoneIcon;
    const checked = done ? doneLine : "";
    const item = `
        <li class="app__taskitems">
            <i class="${isDone} fa-check-circle doneicon app__done" task="complete" id="${id}"></i>
            <p class="app__task ${checked}">${task}</p>
            <i class="fas fa-backspace app__delete" task="remove" id="${id}"></i>
        </li>`

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//add on button-click
document.querySelector(".app__btn").addEventListener("click", function (event) {
    {
        const task = input.value;
        if (task) {
            addTask(task);
            taskList.push({
                name: task,
                id: id,
                done: false,
                remove: false
            })
            id++;
        }
        input.value = "";
    }
})

// add on enter-up
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const task = input.value;

        if (task.length < 33) {
            addTask(task);

            taskList.push({
                name: task,
                id: id,
                done: false,
                remove: false
            })
            id++;
        }
        input.value = "";
    }
});

// mark as done
function completeTask(element) {
    element.classList.toggle(doneIcon);
    element.classList.toggle(undoneIcon);
    element.parentNode.querySelector(".app__task").classList.toggle(doneLine);

    taskList[element.id].done = taskList[element.id].done ? false : true;
}

//remove
function removeTask(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    taskList[element.id].remove = true;
};

//target dynamically
list.addEventListener('click', function (event) {
    const element = event.target; // return the clicked element inside list
    const elementStatus = element.attributes.task.value;

    if (elementStatus == "complete") {
        completeTask(element);
    } else if (elementStatus == "remove") {
        removeTask(element);
    };
})
