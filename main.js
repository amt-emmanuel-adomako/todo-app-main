import database from './fake-api.json' assert { type: "json" };

function modifyListProperties (todoList) {
  todoList.classList.add("task-list");
  let items = todoList.getElementsByTagName("li"), current = null;
// console.log(items)
  for (let i of items) {
    i.draggable = true;
    i.ondragstart = e => {
      current = i;
      for (let it of items) {
        if (it != current) { it.classList.add("hint"); }
      }
    };
    i.ondragenter = e => {
      if (i != current) { i.classList.add("active"); }
    };
    i.ondragleave = () => i.classList.remove("active");

    i.ondragend = () => { for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
    }};
    i.ondragover = e => e.preventDefault();
    i.ondrop = e => {
      e.preventDefault();
      if (i != current) {
        let currentpos = 0, droppedpos = 0;
        for (let it=0; it<items.length; it++) {
          if (current == items[it]) { currentpos = it; }
          if (i == items[it]) { droppedpos = it; }
        }
        if (currentpos < droppedpos) {
          i.parentNode.insertBefore(current, i.nextSibling);
        } else {
          i.parentNode.insertBefore(current, i);
        }
      }
    };
  }
}


function refresh() {
    // document.getElementsByTagName("ul")[0].innerHTML = ''
    for (var i = 0; i < database.tasks.length; i++) {
      if (database.tasks[i].completed) {
        document.getElementsByTagName("ul")[0].innerHTML+= 
        `<li>
          <div id=${database.tasks[i].id} class="circle item-checkable">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
          </div>
          <span id=${database.tasks[i].id+"t"} class="text-completed">${database.tasks[i].todo}</span>
          <svg id= ${database.tasks[i].id+"remove"} class="remove" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </li>`
      }
      else{
          document.getElementsByTagName("ul")[0].innerHTML+= 
          `<li>
            <div id=${database.tasks[i].id} class="circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
            </div>
            <span id=${database.tasks[i].id+"t"}>${database.tasks[i].todo}</span>
            <svg id= ${database.tasks[i].id+"remove"} class="remove" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
          </li>`
        }
      }
      for (let j = 0; j < database.tasks.length; j++) {
        document.getElementById(database.tasks[j].id).addEventListener("click",(e)=>{
          database.tasks[j].completed =!database.tasks[j].completed
          if (database.tasks[j].completed === true) {
            document.getElementById(database.tasks[j].id).classList.add("item-checkable")
            document.getElementById(database.tasks[j].id+'t').classList.add("text-completed")
          }
          else{
            document.getElementById(database.tasks[j].id).classList.remove("item-checkable")
            document.getElementById(database.tasks[j].id+'t').classList.remove("text-completed")
          }
          // console.log(database.tasks[j]);
        })

        document.getElementById(database.tasks[j].id+"remove").addEventListener("click",(e)=>{
          deleteTask(database.tasks[j].id)
        })
      }

      
}
function addTask(taskname) {
    database.tasks.push({"id": idGen(), "todo":taskname, "active":true, "completed":false})
    document.getElementsByTagName("ul")[0].innerHTML = ''
    refresh()
    modifyListProperties(document.getElementById("sortlist"))
    console.log(database)
}

function deleteTask(id) {
    // console.log(id)
    const arr2 = database.tasks.filter(x => x.id !== id);
    database.tasks = arr2
    console.log(database.tasks);
    // console.log(arr2); 
    document.getElementsByTagName("ul")[0].innerHTML = ''
    refresh()
    modifyListProperties(document.getElementById("sortlist"))
}

function idGen(){
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      id += possible.charAt(Math.floor(Math.random() * possible.length));
  
   return id;
  }






document.getElementById("addTodo").addEventListener(
  "keyup",
  (e) => {
    if (e.key === "Enter") {
      // console.log(document.getElementById("addTodo").value)
      addTask(document.getElementById("addTodo").value);
      document.getElementById("addTodo").value = ''
    }
});
refresh()
modifyListProperties(document.getElementById("sortlist"))
// for (let j = 0; j < database.tasks.length; j++) {
//   document.getElementById(database.tasks[j].id).addEventListener("click",(e)=>{
//     database.tasks[j].completed =!database.tasks[j].completed
//     if (database.tasks[j].completed === true) {
//       document.getElementById(database.tasks[j].id).classList.add("item-checkable")
//     }
//     else{
//       document.getElementById(database.tasks[j].id).classList.remove("item-checkable")
//     }
//     console.log(database.tasks[j]);
//     // refresh()
//   })
// }