import database from './fake-api.json' assert { type: "json" };

function modifyListProperties (todoList) {
  todoList.classList.add("task-list");
  let items = todoList.getElementsByTagName("li"), current = null;
console.log(items)
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
      // e.preventDefault();
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
        document.getElementsByTagName("ul")[0].innerHTML+= 
        "<li>"+
            "<span>"+database.tasks[i].todo+"</span>"+
            "<span class='delete-task' id='remove'>"+"x"+"</span>"+
        "</li>"
      };
}
function addTask(taskname) {
    database.tasks.push({"id": idGen(), "todo":taskname, "active":true, "completed":false})
    document.getElementsByTagName("ul")[0].innerHTML = ''
    refresh()
    modifyListProperties(document.getElementById("sortlist"))
    console.log(database)
}

function deleteTask(id) {
    console.log(id)
    // const arr2 = database.tasks.filter(x => x.id !== id);
    // console.log(database.tasks);
    // console.log(arr2); 
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
