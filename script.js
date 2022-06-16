var leftdiv = document.getElementById('leftdiv');
var rightdiv = document.getElementById('rightdiv');
var inputbox = document.getElementById('inputbox');


function init()
{
    inputbox.addEventListener('keydown', eventHandler);
    onLoad();
}


// SHOWING ALL EXISTING TASKS
function onLoad()
{
    var allTasks = getAllTasks();

    allTasks.forEach(function(task)
    {
        addTaskToLeftDiv(task)
    })
}


// GETTING ALL TASKS FROM LOCAL STORAGE
function getAllTasks()
{
    var todoArray = localStorage.getItem('todos');

    if (todoArray != null)
    {
        todoArray = JSON.parse(todoArray);
    }

    else
    {
        todoArray = [];
    }
    return todoArray;
}



// ENTER BUTTON EVENT HANDLER TO ADD AND SAVE TASKS IN LEFT DIV
function eventHandler(event)
{
    var keycode = event.code;
    var value = inputbox.value;

    if (keycode === 'Enter' && value.trim() != '')
    {
        event.preventDefault();

        var todosTask = {
            taskName: value,
            taskId: new Date().getTime().toString(),
            isChecked: false,
        }

        saveTask(todosTask);
        addTaskToLeftDiv(todosTask);
        inputbox.value = '';
    }
}


// SAVING TASKS IN LOCAL STORAGE
function saveTask(data)
{
    var todosArray = getAllTasks();
    todosArray.push(data);
    localStorage.setItem('todos', JSON.stringify(todosArray));
}



// ADDING ALL TASK TO LEFT DIV
function addTaskToLeftDiv(data)
{
    var container = document.createElement('div');
    container.setAttribute('id', 'container');

    var nameOfTask = document.createElement('p');
    nameOfTask.setAttribute('id', 'nameOfTask');

    var nameIdContainer = document.createElement('div');
    nameIdContainer.setAttribute('id', 'nameIdContainer');
    nameIdContainer.setAttribute('class', 'subContainer');

    var ButtonContainer = document.createElement('div');
    ButtonContainer.setAttribute('id', 'ButtonContainer');
    ButtonContainer.setAttribute('class', 'subContainer');

    var readButton = document.createElement('input');
    readButton.setAttribute('type', 'checkbox');
    readButton.setAttribute('id', 'readButton');
    readButton.setAttribute('class', 'containerOfButtons');

    var editButton = document.createElement('span');
    editButton.setAttribute('id', 'editButton');
    editButton.setAttribute('class', 'containerOfButtons');

    var deleteButton = document.createElement('span');
    deleteButton.setAttribute('id', 'deleteButton');
    deleteButton.setAttribute('class', 'containerOfButtons');

    var id = document.createElement('p');
    id.innerHTML = data.taskId;

    ButtonContainer.appendChild(readButton);
    ButtonContainer.appendChild(editButton);
    ButtonContainer.appendChild(deleteButton);

    nameIdContainer.appendChild(nameOfTask);
    nameIdContainer.appendChild(id);

    id.style.display = 'none';

    container.appendChild(nameIdContainer);
    container.appendChild(ButtonContainer);

    nameOfTask.innerHTML = data.taskName;
    editButton.innerHTML = '<i class="fa fa-pencil-square-o" style="font-size:19px;color:black"></i>'
    deleteButton.innerHTML = '<i class="fas fa-trash fa-lg"></i>';

    if (data.isChecked === true)
    {
        nameOfTask.style.textDecoration = 'line-through';
        readButton.checked = true;
    }

    leftdiv.appendChild(container);

    readButton.addEventListener('click', completeButton);
    editButton.addEventListener('click', editTask);
    deleteButton.addEventListener('click', deleteTask);
}



// FUNCTIION FOR COMPLETED TASK
function completeButton(event)
{
    var allTasks = getAllTasks();
    var eventTargetId = event.target.parentNode.parentNode.children[0].children[1].textContent;
    console.log(eventTargetId)

    var TextOfTask = event.target.parentNode.parentNode.children[0].children[0];

    var updatedTask = allTasks.map(function(tasks)
    {
        if (eventTargetId === tasks.taskId)
        {
            if (event.target.checked == true)
            {
                tasks.isChecked = true;
                TextOfTask.style.textDecoration = 'line-through';
            }
            else
            {
                tasks.isChecked = false;
                TextOfTask.style.textDecoration='none';
            }
        }
    })

    updatedTask = allTasks;
    localStorage.setItem('todos', JSON.stringify(updatedTask))
}




// FUNCTION FOR DELETING TASK
function deleteTask(event)
{
    var allTasks = getAllTasks();
    var eventTargetId = event.target.parentNode.parentNode.children[0].children[1].textContent;
    console.log(eventTargetId)

    var index = allTasks.findIndex(function(task)
    {
        return task.taskId == eventTargetId;
    })

    allTasks.splice(index, 1);
    event.target.parentNode.parentNode.remove();

    localStorage.setItem('todos', JSON.stringify(allTasks));
}



// FUNCTION FOR EDIT TASK
function editTask(event)
{
    var todosArray = getAllTasks();
    var promptText = prompt('Enter here to edit your task...');

    var eventTargetId = event.target.parentNode.parentNode.children[0].children[1].textContent;

    var ParentOfTextNode = event.target.parentNode.parentNode.children[0].children[0];
    console.log(ParentOfTextNode)

    var index = todosArray.findIndex(function(task)
    {
        return task.taskId == eventTargetId
    })
    
    if (promptText !== '' && promptText !== null)
    {
        todosArray[index].taskName = promptText;
        ParentOfTextNode.innerHTML = promptText;
        // todosArray[index].taskName.innerHTML = promptText
        // localStorage.setItem("todos",JSON.stringify(todosArray));
    }

    else
    {
        todosArray[index].taskName
    }
    localStorage.setItem("todos",JSON.stringify(todosArray));
}


init();












// backup
// function for edit tasks 
// function editTask(event)
// {
//     var saveTaskButton = document.getElementById('saveTaskButton');
//     var todosArray = getAllTasks();
//     var promptText = prompt('Enter here to edit your task...');

//     var eventTargetId = event.target.parentNode.parentNode.children[0].children[1].textContent;

//     var ParentOfTextNode = event.target.parentNode.parentNode.children[0]
//     console.log(ParentOfTextNode)
//     console.log(ParentOfTextNode.children[0])

//     var index = todosArray.findIndex(function(task)
//     {
//         return task.taskId == eventTargetId
//     })
    
//     if (promptText !== '')
//     {
//         ParentOfTextNode.children[0].innerHTML = promptText;
//         // ParentOfTextNode.replaceChild(promptText, ParentOfTextNode.children[0]);
//         todosArray[index].task = promptText
//     }
    
//     localStorage.setItem("todos",JSON.stringify(todosArray));

// }






// function for edit tasks 
// function editTask(event)
// {
    
//     var todosArray = getAllTasks();
//     // var promptText = prompt('Enter here to edit your task...');

//     var eventTargetId = event.target.parentNode.parentNode.children[0].children[1].textContent;

//     var ParentOfTextNode = event.target.parentNode.parentNode.children[0]
//     // console.log(ParentOfTextNode)
//     // console.log(ParentOfTextNode.children[0])

//     var index = todosArray.findIndex(function(task)
//     {
//         return task.taskId == eventTargetId
//     })
    

//     inputbox.value = todosArray[index].taskName
//     saveTaskButton.style.display = 'block';

//     saveTaskButton.onclick = savingTask(index, ParentOfTextNode);
    
//     // localStorage.setItem("todos",JSON.stringify(todosArray));
// }


// function savingTask(index, ParentOfTextNode)
// {
//     return function()
//     {
//         todosArray = getAllTasks();
//         todosArray[index].taskName = inputbox.value;
//         // todosArray[index].taskName.innerHTML = inputbox.value;
//         ParentOfTextNode.textContent = inputbox.value;
        
//         if (todosArray[index].isChecked == true)
//         {
//             ParentOfTextNode.style.textDecoration = 'line-through';
//         }

//         localStorage.setItem('todos', JSON.stringify(todosArray));

//         inputbox.value = '';

//         saveTaskButton.style.display = 'none';

//     }
// }
