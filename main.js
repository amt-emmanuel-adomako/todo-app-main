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


function refresh(data) {
    // document.getElementsByTagName("ul")[0].innerHTML = ''
    document.getElementById("itemCount").innerHTML=''
    let itemsLeft=0
    for (var i = 0; i < data.length; i++) {
      if (data[i].completed) {
        document.getElementsByTagName("ul")[0].innerHTML+= 
        `<li>
          <div id=${data[i].id} class="circle item-checkable">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
          </div>
          <span id=${data[i].id+"t"} class="text-completed">${data[i].todo}</span>
          <svg id= ${data[i].id+"remove"} class="remove" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </li>`
      }
      else{
        itemsLeft=itemsLeft+1
          document.getElementsByTagName("ul")[0].innerHTML+= 
          `<li>
            <div id=${data[i].id} class="circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
            </div>
            <span id=${data[i].id+"t"}>${data[i].todo}</span>
            <svg id= ${data[i].id+"remove"} class="remove" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
          </li>`
        }
      }
      for (let j = 0; j < data.length; j++) {
        document.getElementById(data[j].id).addEventListener("click",(e)=>{
          data[j].completed =!data[j].completed
          data[j].active =!data[j].active
          if (data[j].completed === true) {
            document.getElementById(data[j].id).classList.add("item-checkable")
            document.getElementById(data[j].id+'t').classList.add("text-completed")
            document.getElementsByTagName("ul")[0].innerHTML = ''
            refresh(data)
            modifyListProperties(document.getElementById("sortlist"))
          }
          else{
            document.getElementById(data[j].id).classList.remove("item-checkable")
            document.getElementById(data[j].id+'t').classList.remove("text-completed")
            document.getElementsByTagName("ul")[0].innerHTML = ''
            refresh(data)
            modifyListProperties(document.getElementById("sortlist"))
          }
          // console.log(data[j]);
        })

        document.getElementById(data[j].id+"remove").addEventListener("click",(e)=>{
          deleteTask(data[j].id)
        })
      }
      document.getElementById("itemCount").innerHTML = itemsLeft+" items left"
      document.getElementById("unsorted").classList.add("active")
}
function addTask(taskname) {
    database.tasks.push({"id": idGen(), "todo":taskname, "active":true, "completed":false})
    document.getElementsByTagName("ul")[0].innerHTML = ''
    refresh(database.tasks)
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
    refresh(database.tasks)
    modifyListProperties(document.getElementById("sortlist"))
}

function idGen(){
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      id += possible.charAt(Math.floor(Math.random() * possible.length));
  
   return id;
  }





  document.getElementById("sortActive").addEventListener(
    "click",
    (e) => {
      const arr2 = database.tasks.filter(x => x.active !== false);
      document.getElementsByTagName("ul")[0].innerHTML = ''
      refresh(arr2)
      modifyListProperties(document.getElementById("sortlist"))
      document.getElementById("unsorted").classList.remove("active")
      document.getElementById("sortCompleted").classList.remove("active")
      document.getElementById("sortActive").classList.add("active")
  });

  document.getElementById("sortCompleted").addEventListener(
    "click",
    (e) => {
      const arr2 = database.tasks.filter(x => x.active === false);
      document.getElementsByTagName("ul")[0].innerHTML = ''
      refresh(arr2)
      modifyListProperties(document.getElementById("sortlist"))
      document.getElementById("unsorted").classList.remove("active")
      document.getElementById("sortCompleted").classList.add("active")
      document.getElementById("sortActive").classList.remove("active")
  });

  document.getElementById("unsorted").addEventListener(
    "click",
    (e) => {
      document.getElementsByTagName("ul")[0].innerHTML = ''
      refresh(database.tasks)
      modifyListProperties(document.getElementById("sortlist"))
      document.getElementById("unsorted").classList.add("active")
      document.getElementById("sortCompleted").classList.remove("active")
      document.getElementById("sortActive").classList.remove("active")
  });



document.getElementById("addTodo").addEventListener(
  "keyup",
  (e) => {
    if (e.key === "Enter") {
      // console.log(document.getElementById("addTodo").value)
      addTask(document.getElementById("addTodo").value);
      document.getElementById("addTodo").value = ''
    }
});
refresh(database.tasks)
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