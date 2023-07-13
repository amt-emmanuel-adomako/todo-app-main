import database from './fake-api.json' assert { type: "json" };

let darkModeBool=false;
let initialIndex = 0 , initalElement, currentElement, state ="all"

function modifyListProperties (todoList) {
  todoList.classList.add("task-list");
  let items = todoList.getElementsByTagName("li"), current = null;
// console.log(items)
  for (let i=0; i<items.length; i++) {
    items[i].draggable = true;
    items[i].ondragstart = e => {
      initialIndex = i
      console.log(items[i].innerText);
      current = items[i];
      for (let it of items) {
        if (it != current) { it.classList.add("hint"); }
      }
    };
    items[i].ondragenter = e => {
      if (items[i] != current) { items[i].classList.add("active"); }
    };
    items[i].ondragleave = () => items[i].classList.remove("active");

    items[i].ondragend = () => { for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
    }};
    items[i].ondragover = e => e.preventDefault();
    items[i].ondrop = e => {
      e.preventDefault();
      if (items[i] != current) {
        let currentpos = 0, droppedpos = 0;
        for (let it=0; it<items.length; it++) {
          if (current == items[it]) { currentpos = it; }
          if (items[i] == items[it]) { droppedpos = it;
             initalElement = database.tasks[initialIndex]
             currentElement = database.tasks[it]
             database.tasks[it]= initalElement
             database.tasks[initialIndex] = currentElement
             
          }
        }
        if (currentpos < droppedpos) {
          items[i].parentNode.insertBefore(current, items[i].nextSibling);
          document.getElementsByTagName("ul")[0].innerHTML = ''
          refresh(database.tasks)
          modifyListProperties(document.getElementById("sortlist"))
        } else {
          items[i].parentNode.insertBefore(current, items[i]);
          document.getElementsByTagName("ul")[0].innerHTML = ''
          refresh(database.tasks)
          modifyListProperties(document.getElementById("sortlist"))
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
          `<li class="task-list-litemode">
            <div id=${data[i].id} class="circle">
              <svg style="display:none" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
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
            console.log(data);
            console.log(database.tasks);
            document.getElementById(data[j].id).classList.add("item-checkable")
            document.getElementById(data[j].id+'t').classList.add("text-completed")
            document.getElementsByTagName("ul")[0].innerHTML = ''
            refresh(data)
            modifyListProperties(document.getElementById("sortlist"))
            if (state === "all") {
              console.log(state);
            document.getElementsByTagName("ul")[0].innerHTML = ''
            refresh(database.tasks)
            modifyListProperties(document.getElementById("sortlist"))
            document.getElementById("unsorted").classList.add("active")
            document.getElementById("sortCompleted").classList.remove("active")
            document.getElementById("sortActive").classList.remove("active")
            }
             if (state === "active") {
              console.log(state);
              const arr2 = database.tasks.filter(x => x.active !== false);
              document.getElementsByTagName("ul")[0].innerHTML = ''
              refresh(arr2)
              modifyListProperties(document.getElementById("sortlist"))
              document.getElementById("unsorted").classList.remove("active")
              document.getElementById("sortCompleted").classList.remove("active")
              document.getElementById("sortActive").classList.add("active")
            } 
            if(state==="completed"){
              console.log(state);
              const arr2 = database.tasks.filter(x => x.active === false);
              document.getElementsByTagName("ul")[0].innerHTML = ''
              refresh(arr2)
              modifyListProperties(document.getElementById("sortlist"))
              document.getElementById("unsorted").classList.remove("active")
              document.getElementById("sortCompleted").classList.add("active")
              document.getElementById("sortActive").classList.remove("active")
            }
          }
          else{
            document.getElementById(data[j].id).classList.remove("item-checkable")
            document.getElementById(data[j].id+'t').classList.remove("text-completed")
            document.getElementsByTagName("ul")[0].innerHTML = ''
            refresh(data)
            modifyListProperties(document.getElementById("sortlist"))
            if (state === "all") {
              console.log(state);
            document.getElementsByTagName("ul")[0].innerHTML = ''
            refresh(database.tasks)
            modifyListProperties(document.getElementById("sortlist"))
            document.getElementById("unsorted").classList.add("active")
            document.getElementById("sortCompleted").classList.remove("active")
            document.getElementById("sortActive").classList.remove("active")
            }
             if (state === "active") {
              console.log(state);
              const arr2 = database.tasks.filter(x => x.active !== false);
              document.getElementsByTagName("ul")[0].innerHTML = ''
              refresh(arr2)
              modifyListProperties(document.getElementById("sortlist"))
              document.getElementById("unsorted").classList.remove("active")
              document.getElementById("sortCompleted").classList.remove("active")
              document.getElementById("sortActive").classList.add("active")
            } 
            if(state==="completed"){
              console.log(state);
              const arr2 = database.tasks.filter(x => x.active === false);
              document.getElementsByTagName("ul")[0].innerHTML = ''
              refresh(arr2)
              modifyListProperties(document.getElementById("sortlist"))
              document.getElementById("unsorted").classList.remove("active")
              document.getElementById("sortCompleted").classList.add("active")
              document.getElementById("sortActive").classList.remove("active")
            }
          }
          // console.log(data[j]);
        })
        document.getElementById(data[j].id).addEventListener("mouseover",()=>{
          if (!data[j].completed) {
            document.getElementById(data[j].id).classList.remove("circle")
            document.getElementById(data[j].id).classList.add("circle-hover")
          }
        })

        document.getElementById(data[j].id).addEventListener("mouseleave",()=>{
          if (!data[j].completed) {
          document.getElementById(data[j].id).classList.add("circle")
          document.getElementById(data[j].id).classList.remove("circle-hover")
          }
        })

        document.getElementById(data[j].id+"remove").addEventListener("click",(e)=>{
          deleteTask(data[j].id)
        })
      }
      document.getElementById("itemCount").innerHTML = itemsLeft+" items left"
      document.getElementById("unsorted").classList.add("active")
      if (darkModeBool) {
        darkMode()    
      } else {
        lightMode()  
      }
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

function deleteAllComplete(params) {
  var filter = {
    completed: true
  };
  
  
  database.tasks= database.tasks.filter(function(item) {
    for (var key in filter) {
      if (item[key] === filter[key])
      // console.log(key, item[key], filter)
        return false;
    }
    return true;
  });
  document.getElementsByTagName("ul")[0].innerHTML = ''
  refresh(database.tasks)
  modifyListProperties(document.getElementById("sortlist"))
  // console.log(users)
  // for (let i = 0; i < database.tasks.length; i++) {
  //   if (database.tasks[i].completed) {
  //     deleteTask(database.tasks[i].id)
  //   }
    
  // }
}

document.getElementById("clearCompleted").addEventListener(
  "click",
  (e) => {
    deleteAllComplete()
    document.getElementById("sortCompleted").classList.remove("active")
});

  document.getElementById("sortActive").addEventListener(
    "click",
    (e) => {
      const arr2 = database.tasks.filter(x => x.active !== false);
      state = "active"
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
      state = "completed"
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
      state = "all"
      document.getElementsByTagName("ul")[0].innerHTML = ''
      refresh(database.tasks)
      modifyListProperties(document.getElementById("sortlist"))
      document.getElementById("unsorted").classList.add("active")
      document.getElementById("sortCompleted").classList.remove("active")
      document.getElementById("sortActive").classList.remove("active")
  });

  document.getElementById("sortActive-m").addEventListener(
    "click",
    (e) => {
      const arr2 = database.tasks.filter(x => x.active !== false);
      document.getElementsByTagName("ul")[0].innerHTML = ''
      refresh(arr2)
      modifyListProperties(document.getElementById("sortlist"))
      document.getElementById("unsorted-m").classList.remove("active")
      document.getElementById("sortCompleted-m").classList.remove("active")
      document.getElementById("sortActive-m").classList.add("active")
  });

  document.getElementById("sortCompleted-m").addEventListener(
    "click",
    (e) => {
      const arr2 = database.tasks.filter(x => x.active === false);
      document.getElementsByTagName("ul")[0].innerHTML = ''
      refresh(arr2)
      modifyListProperties(document.getElementById("sortlist"))
      document.getElementById("unsorted-m").classList.remove("active")
      document.getElementById("sortCompleted-m").classList.add("active")
      document.getElementById("sortActive-m").classList.remove("active")
  });

  document.getElementById("unsorted-m").addEventListener(
    "click",
    (e) => {
      document.getElementsByTagName("ul")[0].innerHTML = ''
      refresh(database.tasks)
      modifyListProperties(document.getElementById("sortlist"))
      document.getElementById("unsorted-m").classList.add("active")
      document.getElementById("sortCompleted-m").classList.remove("active")
      document.getElementById("sortActive-m").classList.remove("active")
  });
function darkMode() {
  console.log("entering dark mode")
    document.getElementsByTagName("body")[0].classList.add("body-dark-mode")
    document.getElementById("lightDark").classList.remove("list-form-litemode")
    document.getElementById("lightDark").classList.add("list-form-darkmode")
    document.getElementById("inputField").classList.remove("input-field-litemode")
    document.getElementById("inputField").classList.add("input-field-darkmode")
    document.getElementById("addTodo").classList.remove("add-todo-litemode")
    document.getElementById("addTodo").classList.add("add-todo-darkmode")
    document.getElementById("lightMode").classList.remove("hide")
    document.getElementById("lightMode").classList.add("show")
    document.getElementById("darkMode").classList.remove("show")
    document.getElementById("darkMode").classList.add("hide")
    document.getElementById("scMoble").classList.add("list-form-darkmode")
    document.getElementById("scMoble").setAttribute("style","background-color:#25273D; color: #9495A5;")
    let elements = document.querySelectorAll('li');
    elements.forEach(element => {
      element.classList.add("task-list-darkmode")  
    });
}

function lightMode() {
  let elements = document.querySelectorAll('li');
  // console.log("entering light mode", database.tasks)
    document.getElementsByTagName("body")[0].classList.remove("body-dark-mode")
    document.getElementById("lightDark").classList.remove("list-form-darkmode")
    document.getElementById("lightDark").classList.add("list-form-litemode")
    document.getElementById("inputField").classList.add("input-field-litemode")
    document.getElementById("inputField").classList.remove("input-field-darkmode")
    document.getElementById("addTodo").classList.add("add-todo-litemode")
    document.getElementById("addTodo").classList.remove("add-todo-darkmode")
    document.getElementById("lightMode").classList.remove("show")
    document.getElementById("lightMode").classList.add("hide")
    document.getElementById("darkMode").classList.remove("hide")
    document.getElementById("darkMode").classList.add("show")
    document.getElementById("scMoble").setAttribute("style","background-color:#FFF;")
    // let elements = document.querySelectorAll('li');
    elements.forEach(element => {
      element.classList.remove("task-list-darkmode")  
    });

}



document.getElementById("darkMode").addEventListener("click", ()=>{
  darkModeBool = !darkModeBool
  console.log(darkModeBool)
  if (darkModeBool) {
    darkMode()
  } else {
    lightMode()
  }
  
})

document.getElementById("lightMode").addEventListener("click", ()=>{
  darkModeBool = !darkModeBool
  console.log(darkModeBool)
  if (darkModeBool) {
    darkMode()
  } else {
    lightMode()
  }
  
})
//   document.getElementById("darkMode").addEventListener("click", (e)=>{
//     console.log("entering dark mode")
//     document.getElementsByTagName("body")[0].classList.add("body-dark-mode")
//     document.getElementById("lightDark").classList.remove("list-form-litemode")
//     document.getElementById("lightDark").classList.add("list-form-darkmode")
//     document.getElementById("inputField").classList.remove("input-field-litemode")
//     document.getElementById("inputField").classList.add("input-field-darkmode")
//     document.getElementById("addTodo").classList.remove("add-todo-litemode")
//     document.getElementById("addTodo").classList.add("add-todo-darkmode")
//     let elements = document.querySelectorAll('li');
//     elements.forEach(element => {
//       element.classList.add("task-list-darkmode")  
//     });
//  })

  document.getElementById("addTodo").addEventListener(
    "keyup",
    (e) => {
      if (e.key === "Enter" && document.getElementById("addTodo").value) {
        // console.log(document.getElementById("addTodo").value)
        addTask(document.getElementById("addTodo").value);
        document.getElementById("addTodo").value = ''
      }
  });
  refresh(database.tasks)
  modifyListProperties(document.getElementById("sortlist"))