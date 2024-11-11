let modal = document.querySelector('#modal-container');
let filter = document.querySelector('#filter-content');
let initialTd = document.getElementById('initial-td');
let taskTableBody = document.getElementById('task-table-body');

let modalTask = document.getElementById('modal-task')
let modalReport = document.getElementById('modal-report')

let countTasks = 0;

modal.classList.add('hidden');
filter.classList.add('hidden');

console.log(filter)
function openModal() {
    modal.classList.toggle('hidden');

    modalTask.style.display = ''
    modalReport.style.display = 'none'
}

// Fechar o modal se clicar fora do conteúdo
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
})

function openFilter() {
    console.log('hello world')
    filter.classList.toggle('hidden');
    console.log(filter)
}

// Função para filtrar as tarefas
function filterTasks() {
    let filterPriority = document.getElementById('filter-priority');
    let filterDate = document.getElementById('filter-date');

    // Obtém os valores selecionados nos filtros
    let selectedPriority = filterPriority.value;
    let selectedDate = filterDate.value;

    // Obtém todas as tarefas na tabela
    let tasks = taskTableBody.querySelectorAll('.task');

    // Loop sobre todas as tarefas
    tasks.forEach(function (task) {
        // Obtém os dados de prioridade e data da tarefa
        let taskPriority = task.getAttribute('data-priority');
        let taskDate = task.getAttribute('data-date');

        console.log("Prioridade da Tarefa:", taskPriority);
        console.log("Data da Tarefa:", taskDate);

        // Verifica se a tarefa corresponde ao filtro
        let matchesPriority = selectedPriority ? taskPriority === selectedPriority : true;
        let matchesDate = selectedDate ? taskDate === selectedDate : true;

        // Exibe ou oculta a tarefa com base nos filtros
        if (matchesPriority && matchesDate) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });

}

// Adiciona os eventos de filtro
document.getElementById('filter-priority').addEventListener('change', filterTasks);
document.getElementById('filter-date').addEventListener('change', filterTasks);

btnSaveTask = document.getElementById('save-task');
btnSaveTask.style.display = 'none';

function attTable(countTasks) {    

    if (countTasks >= 1) {
        initialTd.style.display = 'none';
    } else {
        initialTd.style.display = ''
    }
}

function addTask() {
    const task = {
        taskTitle: '',
        taskDesc: '',
        taskPriority: '',
        taskDateCreate: 0,

        importTask: function (newTask) {
            newTask.innerHTML = `
                <tr class="task">
                    <td class="task-title" scope="row">${this.taskTitle}</td>
                    <td class="task-desc" scope="row">${this.taskDesc}</td>
                    <td class="task-priority" scope="row">${this.taskPriority}</td>
                    <td class="task-date" scope="row">${this.taskDateCreate}</td>
                    <td scope="row">
                        <div>
                            <button class="btn-remove-task"><span class="material-symbols-outlined">delete_forever</span></button>
                        </div>
                    </td>
                </tr>
            `
            newTask.setAttribute('data-priority', task.taskPriority);
            newTask.setAttribute('data-date', task.taskDateCreate);
        }
    }

    countTasks += 1;

    task.taskTitle = document.getElementById('task-title').value;
    task.taskDesc = document.getElementById('task-desc').value;
    task.taskPriority = document.getElementById('task-priority').value;
    task.taskDateCreate = task.taskDateCreate = new Date().toISOString().split('T')[0]

    let newTask = document.createElement('tr');
    newTask.classList.add('task');
    task.importTask(newTask);

    attTable(countTasks)

    newTask.querySelector('.btn-remove-task').addEventListener('click', function() {
        newTask.remove();
        countTasks -= 1;

        attTable(countTasks)
    })

    const taskTable = document.getElementById('task-table-body');
    if (taskTable) {
        taskTable.appendChild(newTask);
    }

    // Limpa os campos de entrada após adicionar a tarefa
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('task-priority').value = '';
}

function seeReport() {
    modal.classList.toggle('hidden');
    let allTasks = taskTableBody.querySelectorAll('.task')

    modalTask.style.display = 'none'
    modalReport.style.display = ''
    modalReport.innerHTML = `<p>Você tem um total de ${allTasks.length} tarefas.</p>`
}