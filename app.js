var welcome = function(){
  console.log("Hello, and welcome to my To Do app!");
};

//similar to _.once. Function init calls once with welcome and message if called again.

var once = function(func, str){
  var beenCalled = false;
  var memo;
  return function(){
    if(beenCalled === true){
      return str;
    } else {
      beenCalled = true;
      memo = func();
      return memo;
    };
  };
};

var each = function(arr, func){
  for(var i = 0; i < arr.length; i++){
    func(arr[i], [i], arr);
  };
};

//flags, arrays, and more declared.

var init = once(welcome, "Application has been initialized.");
var haveCompletedTasks = false;
var showingCurrentTasks = true;
var haveTasks = false;
var currentTasks = [];
var completedTasks = [];

//add a task to the queue
var add = function(){
  var sup = document.getElementById("textbox").value;
  if(!sup || sup.replace(/\s/g, "").length < 1){//if there is no inpur or it's just spaces/tabs, alert that there must be content
        sweetAlert("Ooops...", "Task must have some content.", "error");
    } else if (showingCurrentTasks){//straightforward add tasks
        wrapper = $("<li >", {
          "class": "todo",
          "onclick": "todoCompletedClassSwap();",
          "text": sup
          }).appendTo(document.getElementById("list"));
        document.getElementById("form").reset();
        haveTasks = true;
    } else { //add tasks while showing completed tasks- calls toggleTasks and then adds task
        toggleTasks();
        wrapper = $("<li >", {
          "class": "todo",
          "onclick": "todoCompletedClassSwap();",
          "text": sup
          }).appendTo(document.getElementById("list"));
        document.getElementById("form").reset();
        showingCurrentTasks = true;
  };
};

//click on a task to remove it- alerts congratulations, swaps classname

var todoCompletedClassSwap = function(){
  haveCompletedTasks = true;
  sweetAlert("Way to go!", null, "success");
  if(event.srcElement.className === "todo"){
       event.srcElement.className = "completed invisible";
       event.srcElement.setAttribute("onclick", "readd()");
       //console.log(event.srcElement);
     } else {
       event.srcElement.className = "todo invisible"; 
  };
  completedTasks.push(event.srcElement);
};

var toggleTasks = function(){//toggles between completed and current tasks.
    if(!haveCompletedTasks){// If no completed tasks, alert window.
    sweetAlert("Ooops...", "No completed tasks yet.", "error");
  } else if (showingCurrentTasks){//if showing current tasks, change status div to "Completed Tasks", shows completed and hides current tasks
    var div = document.getElementById("status");
    div.innerHTML = "Completed Tasks";
    hideClass("todo");
    showClass("completed");
    showingCurrentTasks = false;
  } else {
    showingCurrentTasks = true;//Otherwise, changes status div back to "Tasks Todo", shows current tasks and hides completed tasks
    var div = document.getElementById("status");
    div.innerHTML = "Tasks Todo";
    hideClass("completed");
    showClass("todo");
    areThereAnyCompletedTasks();
  };
};

var hideClass = function(className){
  var divs = document.getElementsByClassName(className);
  //console.log(divs);
  for (var name in divs){
    if(divs[name].className === className){
      divs[name].className = className + " invisible";
      //console.log(divs[name].className + " success");
    };
  };
};

var showClass = function(className){
  var divs = document.getElementsByClassName(className);
  for (var name in divs){
    if(divs[name].className === className + " invisible"){
      divs[name].className = className;
      //console.log(divs[name].className + " success");
    };
  };
};

var readd = function(srcElement){
  sweetAlert("OK!", "Task readded to todo list!", "success");
  event.srcElement.setAttribute("class", "todo invisible");
  event.srcElement.setAttribute("onclick", "todoCompletedClassSwap()");
  //if(false){haveCompletedTasks = false;}
};

//allows return aka enter key to enter tasks, but disables it from reloading page (an issue that happened when focus is on textbox and enter pressed);
document.onkeydown = function(){
  if(event.keyCode == "13" && document.getElementById("textbox").focus){
    event.preventDefault();
    document.getElementById("button1").click();
    document.getElementById("disableMe").disabled = true;
    setTimeout(function(){document.getElementById("disableMe").disabled = false;}, 400);
    document.getElementById("disableMe").click();
    resetCursor(document.getElementById("textbox"));
    //return false
  };
  if(event.keyCode == "13"){
     event.preventDefault();
    };
  //if(document.getElementById("disableMe").)
    //document.getElementById("disableMe").click();
    //window.onfocus //closeModal();
};

//resets cursor in textbox

function resetCursor(txtElement) { 
    if (txtElement.setSelectionRange) { 
        txtElement.focus(); 
        txtElement.setSelectionRange(0, 0); 
    } else if (txtElement.createTextRange) { 
        var range = txtElement.createTextRange();  
        range.moveStart('character', 0); 
        range.select(); 
    } 
}

//checks to see if there are any completed tasks left after toggling away from completed tasks view. If there are none left, resets haveCompletedTasks flag to false
var areThereAnyCompletedTasks = function(func){
  if(!haveCompletedTasks){console.log("There are no completed tasks yet"); return};
  var all = document.getElementsByTagName("*");//nodelist
  var moreCompletedTasksLeft = false;
  for (var key in all){
    if(all[key]["className"] == "completed" || all[key]["className"] == "completed invisible"){
      moreCompletedTasksLeft = true;
    };
  };
  if(moreCompletedTasksLeft){
    console.log("haveCompletedTasks is still true")
    return;
    } else {
      haveCompletedTasks = false;
      console.log("haveCompletedTasks was changed to false");; return;
  };
};

init();