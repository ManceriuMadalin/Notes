let order = 0
let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let texts = JSON.parse(localStorage.getItem('texts')) || []

function createTask(bgColor) {
     order -= 1
     let task = document.createElement('div');
     task.style.backgroundColor = bgColor;
     task.style.order = order
     task.classList.add('task');
     document.querySelector('#main').append(task);
     tasks.push({ order: order, bgColor: bgColor })
     localStorage.setItem('tasks', JSON.stringify(tasks))
     setTimeout(() => {
          task.style.height = '250px';
          task.style.width = '250px';
          task.style.borderRadius = '10%';
     }, 500);
     textarea(task, bgColor);

     task.addEventListener("dblclick", () => {
          task.style.opacity = 0
          const index = tasks.findIndex((t) => t.order === parseInt(task.style.order));
          console.log(index)
          tasks.splice(index, 1)
          texts.splice(index, 1)
          let i = 1
          tasks.forEach((t) => {
               t.order = -i
               i += 1
          })
          localStorage.setItem('tasks', JSON.stringify(tasks));
          localStorage.setItem('texts', JSON.stringify(texts));
          setTimeout(() => {
               task.remove();
          }, 1000)
     });
}

function attachDblClickEvent(task) {
     task.addEventListener("dblclick", () => {
          task.style.opacity = 0
          const index = tasks.findIndex((t) => t.order === parseInt(task.style.order));
          console.log(index)
          tasks.splice(index, 1)
          texts.splice(index, 1)
          let i = 1
          tasks.forEach((t) => {
               t.order = -i
               i += 1
          })
          localStorage.setItem('tasks', JSON.stringify(tasks));
          localStorage.setItem('texts', JSON.stringify(texts));
          setTimeout(() => {
               task.remove();
          }, 1000);
     });
}

function textarea(task, bgColor) {
     let text = document.createElement('textarea');
     setTimeout(() => { task.appendChild(text) }, 1500);
     text.style.backgroundColor = bgColor;
     text.addEventListener("mouseout", () => {
          text.readOnly = true;
          texts.push({ text: text.value });
          localStorage.setItem('texts', JSON.stringify(texts));
     });
}

window.onload = () => {
     if (localStorage.getItem('tasks')) {
          tasks = JSON.parse(localStorage.getItem('tasks'))
          texts = JSON.parse(localStorage.getItem('texts'))
          let i = 0
          tasks.forEach((t) => {
               const task = document.createElement('div')
               const text = document.createElement('textarea')
               task.classList.add('task')
               task.style.backgroundColor = t.bgColor
               task.style.order = t.order
               task.style.height = '250px'
               task.style.width = '250px'
               task.style.borderRadius = '10%'
               text.style.backgroundColor = t.bgColor
               text.textContent = texts[i].text
               i += 1
               task.appendChild(text)
               document.querySelector('#main').appendChild(task)
               attachDblClickEvent(task);
          });
          order = tasks[tasks.length - 1].order
     }
}
