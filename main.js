import database from './fake-api.json' assert { type: "json" };

function addTask(taskname) {
    database.tasks.push({"id": idGen(), "todo":taskname, "active":true, "completed":false})
    console.log(database)
}

function deleteTask(id) {
    const arr2 = database.tasks.filter(x => x.id !== id);
    // database.tasks=arr2
    console.log(database.tasks);
    console.log(arr2); 
}

function idGen(){
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      id += possible.charAt(Math.floor(Math.random() * possible.length));
  
   return id;
  }
  

// addTask("new task3");
// deleteTask("4f5eef");