//generating table
var body = document.getElementsByTagName('body')[0];
let speed = 10;
var tbl = document.createElement('table');
var tbdy = document.createElement('tbody');
tbdy.className = "grid";
for (var r = 0; r < 20; r++) {
  var tr = document.createElement('tr');
  for (var c = 0; c < 50; c++) {
    var td = document.createElement('td');
    td.id = r + "-" + c;
    td.className = "unvisited";
    td.appendChild(document.createTextNode('\u0020'))
    r == 1 && c == 1 ? td.setAttribute('rowSpan', '1') : null;
    tr.appendChild(td)
  }
  tbdy.appendChild(tr);
}
tbl.appendChild(tbdy);
body.appendChild(tbl)

//coloring start and finish
var cells = document.querySelectorAll("td");
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {

    var s = document.getElementsByClassName("start")[0];
    if (s != null) {
      s.className = "unvisited";
    }

    this.className = this.className == "unvisited" ? "start" : "unvisited";
  });
}
var cells = document.querySelectorAll("td");
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("contextmenu", function () {

    var e = document.getElementsByClassName("end")[0];
    if (e != null) {
      e.className = "unvisited";
    }

    this.className = this.className == "unvisited" ? "end" : "unvisited";
  });
}

// Queue class
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue(element) {
    // removing element from the queue
    // returns underflow when called 
    // on empty queue
    if (this.isEmpty())
      return "Underflow";
    return this.items.shift();
  }
  // isEmpty function
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }
}
//Stack class
class Stack {
  constructor() {
    this.items = [];
  }
  // push function
  push(element) {
    // push element into the items
    this.items.push(element);
  }
  peek() {
    return this.items[0];
  }
  // pop function
  pop() {
    // return top most element in the stack
    // and removes it from the stack
    // Underflow if stack is empty
    if (this.items.length == 0)
      return "Underflow";
    return this.items.pop();
  }
  shift() {
    if (this.items.length === 0) {
      return "Underflow"
    }
    return this.items.shift()
  }
  // isEmpty function
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }
  emptyArray() {
    while (this.items.length != 0) {
      this.items.pop()
    }
  }
}
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//functions(algorithms)
function reset() {
  let list = document.getElementsByTagName("td");
  for (var i = 0; i < list.length; i++) {
    list[i].className = "unvisited";
  }
  window.stop();
}
function change(type, search, ids) {
  //console.log(ids)

  document.getElementById(type).innerText = search
  if (document.getElementsByClassName("visited").length !== 0) { reset() }
  var item = document.getElementById(ids);
  let hide = document.getElementsByClassName("hidden")
  // console.log(document.getElementsByClassName("hidden"))
  if (hide !== null) {
    // console.log("hey I am in the if statement")
    for (var i of hide) {
      i.className = 'searches'
    }
  }
  item.className = "hidden";
}

function dfs() {
  var start = document.getElementsByClassName("start")[0]
  var end = document.getElementsByClassName("end")[0]
  let sktack = new Stack();
  let arr = new Stack()
  sktack.push(start);
  function get_sides(node) {
    if (node.className != "start") {
      node.className = "visited";
      arr.push(node)
    }
    if (node.className === "end") {
      sktack.emptyArray()
    }
    else {
      var id = node.id.split('-');
      var row = parseInt(id[0]);
      var col = parseInt(id[1]);
      for (var i = -1; i < 2; i = i + 2) {
        if (col + i >= 0 && col + i <= 49) {

          var RiOrLe = document.getElementById((row) + "-" + (col + i));
          if (RiOrLe.className != "visited" && RiOrLe.className != "end" && RiOrLe.className != "start") {
            sktack.push(RiOrLe)
          }
        }
        if (row + i >= 0 && row + i <= 19) {
          var UpOrDo = document.getElementById((row + i) + "-" + (col));
          if (UpOrDo.className === "end") {
            sktack.emptyArray();
            break;
          }
          if (UpOrDo.className != "visited" && UpOrDo.className != "end" && UpOrDo.className != "start") {
            sktack.push(UpOrDo)
          }
        }
      }
    }
  }
  if (speed !== 0) {
    const doSomething = async () => {
      while (!sktack.isEmpty()) {
        await sleep(speed);
        get_sides(sktack.pop())
      }
      while (!arr.isEmpty()) {
        await sleep(speed);
        arr.shift().className = "path"
      }
    }
    doSomething();

  }
  else {
    while (!sktack.isEmpty()) {
      get_sides(sktack.pop())
    }
    while (!arr.isEmpty()) {
      arr.shift().className = "path"
    }
  }

}

function bfs() {
  //find start
  var start = document.getElementsByClassName("start")[0];

  let q = new Queue();
  q.enqueue(start);

  const doSomething = async () => {
    while (!q.isEmpty()) {
      await sleep(speed);
      var x = q.dequeue();

      var row = parseInt(x.id.split('-')[0]);
      var col = parseInt(x.id.split('-')[1]);
      //go up
      if ((row - 1) >= 0) {
        var u = document.getElementById((row - 1) + "-" + col);
        if (u.className == "end") {
          break;
        } else if (u.className != "start" && u.className != "visited") {
          u.className = "visited";
          u.title = row + "-" + col;
          q.enqueue(u);
        }
      }
      //go down
      if ((row + 1) <= 19) {
        var d = document.getElementById((row + 1) + "-" + col);
        if (d.className == "end") {
          break;
        } else if (d.className != "start" && d.className != "visited") {
          d.className = "visited";
          d.title = row + "-" + col;
          q.enqueue(d);
        }
      }
      //go right
      if ((col + 1) <= 49) {
        var r = document.getElementById(row + "-" + (col + 1));
        if (r.className == "end") {
          break;
        } else if (r.className != "start" && r.className != "visited") {
          r.className = "visited";
          r.title = row + "-" + col;
          q.enqueue(r);
        }
      }
      //go left
      if ((col - 1) >= 0) {
        var l = document.getElementById(row + "-" + (col - 1));
        if (l.className == "end") {
          break;
        } else if (l.className != "start" && l.className != "visited") {
          l.className = "visited";
          l.title = row + "-" + col;
          q.enqueue(l);
        }
      }
    }

    //traceback
    var prev = document.getElementById(row + "-" + col);
    while (prev.className != "start") {
      await sleep(speed);
      prev.className = "path";
      row = parseInt(prev.title.split('-')[0]);
      col = parseInt(prev.title.split('-')[1]);
      prev = document.getElementById(row + "-" + col);
    }
  }

  doSomething();
}
function bibfs() {
  var start = document.getElementsByClassName("start")[0];
  let startQ = new Queue();
  startQ.enqueue(start);

  var end = document.getElementsByClassName("end")[0];
  let endQ = new Queue();
  endQ.enqueue(end);
  //if speed ! =0{}
  const finding = async () => {
    var row = -1;
    var col = -1;
    let f = "";
    while (!startQ.isEmpty()) {
      await sleep(speed);
      var s = startQ.dequeue();
      var e = endQ.dequeue();

      var startRow = parseInt(s.id.split('-')[0]);
      var startCol = parseInt(s.id.split('-')[1]);
      var endRow = parseInt(e.id.split('-')[0]);
      var endCol = parseInt(e.id.split('-')[1]);

      //go up
      if ((startRow - 1) >= 0) {
        var upStart = document.getElementById((startRow - 1) + "-" + startCol);
        if (upStart.className == "end" || upStart.className == "endPath") {
          f = "start";
          row = parseInt(upStart.title.split('-')[0]);
          col = parseInt(upStart.title.split('-')[1]);
          upStart.title = startRow + "-" + startCol;
          startRow--;
          break;
        } else if (upStart.className != "start" && upStart.className != "startPath") {
          upStart.className = "startPath";
          upStart.title = startRow + "-" + startCol;
          startQ.enqueue(upStart);
        }
      }
      if ((endRow - 1) >= 0) {
        var upEnd = document.getElementById((endRow - 1) + "-" + endCol);
        if (upEnd.className == "start" || upEnd.className == "startPath") {
          row = parseInt(upEnd.title.split('-')[0]);
          col = parseInt(upEnd.title.split('-')[1]);
          upEnd.title = endRow + "-" + endCol;
          endRow--;
          break;
        } else if (upEnd.className != "end" && upEnd.className != "endPath") {
          upEnd.className = "endPath";
          upEnd.title = endRow + "-" + endCol;
          endQ.enqueue(upEnd);
        }
      }

      //go down
      if ((startRow + 1) <= 19) {
        var downStart = document.getElementById((startRow + 1) + "-" + startCol);
        if (downStart.className == "end" || downStart.className == "endPath") {
          f = "start";
          row = parseInt(downStart.title.split('-')[0]);
          col = parseInt(downStart.title.split('-')[1]);
          downStart.title = startRow + "-" + startCol;
          startRow++;
          break;
        } else if (downStart.className != "start" && downStart.className != "startPath") {
          downStart.className = "startPath";
          downStart.title = startRow + "-" + startCol;
          startQ.enqueue(downStart);
        }
      }
      if ((endRow + 1) <= 19) {
        var downEnd = document.getElementById((endRow + 1) + "-" + endCol);
        if (downEnd.className == "start" || downEnd.className == "startPath") {
          row = parseInt(downEnd.title.split('-')[0]);
          col = parseInt(downEnd.title.split('-')[1]);
          downEnd.title = endRow + "-" + endCol;
          endRow++;
          break;
        } else if (downEnd.className != "end" && downEnd.className != "endPath") {
          downEnd.className = "endPath";
          downEnd.title = endRow + "-" + endCol;
          endQ.enqueue(downEnd);
        }
      }

      //go right
      if ((startCol + 1) <= 49) {
        var rightStart = document.getElementById(startRow + "-" + (startCol + 1));
        if (rightStart.className == "end" || rightStart.className == "endPath") {
          f = "start";
          row = parseInt(rightStart.title.split('-')[0]);
          col = parseInt(rightStart.title.split('-')[1]);
          rightStart.title = startRow + "-" + startCol;
          startCol++;
          break;
        } else if (rightStart.className != "start" && rightStart.className != "startPath") {
          rightStart.className = "startPath";
          rightStart.title = startRow + "-" + startCol;
          startQ.enqueue(rightStart);
        }
      }
      if ((endCol + 1) <= 49) {
        var rightEnd = document.getElementById(endRow + "-" + (endCol + 1));
        if (rightEnd.className == "start" || rightEnd.className == "startPath") {
          row = parseInt(rightEnd.title.split('-')[0]);
          col = parseInt(rightEnd.title.split('-')[1]);
          rightEnd.title = endRow + "-" + endCol;
          endCol++;
          break;
        } else if (rightEnd.className != "end" && rightEnd.className != "endPath") {
          rightEnd.className = "endPath";
          rightEnd.title = endRow + "-" + endCol;
          endQ.enqueue(rightEnd);
        }
      }

      //go left
      if ((startCol - 1) >= 0) {
        var leftStart = document.getElementById(startRow + "-" + (startCol - 1));
        if (leftStart.className == "end" || leftStart.className == "endPath") {
          f = "start";
          row = parseInt(leftStart.title.split('-')[0]);
          col = parseInt(leftStart.title.split('-')[1]);
          leftStart.title = startRow + "-" + startCol;
          startCol--;
          break;
        } else if (leftStart.className != "start" && leftStart.className != "startPath") {
          leftStart.className = "startPath";
          leftStart.title = startRow + "-" + startCol;
          startQ.enqueue(leftStart);
        }
      }
      if ((endCol - 1) >= 0) {
        var leftEnd = document.getElementById(endRow + "-" + (endCol - 1));
        if (leftEnd.className == "start" || leftEnd.className == "startPath") {
          row = parseInt(leftEnd.title.split('-')[0]);
          col = parseInt(leftEnd.title.split('-')[1]);
          leftEnd.title = endRow + "-" + endCol;
          endCol--;
          break;
        } else if (leftEnd.className != "end" && leftEnd.className != "endPath") {
          leftEnd.className = "endPath";
          leftEnd.title = endRow + "-" + endCol;
          endQ.enqueue(leftEnd);
        }
      }
    }

    if (f == "start") {
      var prev = document.getElementById(row + "-" + col);
      while (prev.className != "end") {
        await sleep(speed);
        prev.className = "path";
        row = parseInt(prev.title.split('-')[0]);
        col = parseInt(prev.title.split('-')[1]);
        prev = document.getElementById(row + "-" + col);
      }

      prev = document.getElementById(startRow + "-" + startCol);
      while (prev.className != "start") {
        await sleep(speed);
        prev.className = "path";
        row = parseInt(prev.title.split('-')[0]);
        col = parseInt(prev.title.split('-')[1]);
        prev = document.getElementById(row + "-" + col);
      }
    } else {
      var prev = document.getElementById(row + "-" + col);
      while (prev.className != "start") {
        await sleep(speed);
        prev.className = "path";
        row = parseInt(prev.title.split('-')[0]);
        col = parseInt(prev.title.split('-')[1]);
        prev = document.getElementById(row + "-" + col);
      }

      prev = document.getElementById(endRow + "-" + endCol);
      while (prev.className != "end") {
        await sleep(speed);
        prev.className = "path";
        row = parseInt(prev.title.split('-')[0]);
        col = parseInt(prev.title.split('-')[1]);
        prev = document.getElementById(row + "-" + col);
      }
    }

  }
  //else{}
  finding();
}

function run() {
  var something = document.getElementById("algos");
  if (document.getElementsByClassName("start").length === 0 || document.getElementsByClassName("end").length === 0) {
    alert("pleaes select a start and/or end point(s)")
  }
  else if (something.innerText === "Breadth-First") {
    bfs()
  }
  else if (something.innerText === "Bi-Directional") {
    bibfs()
  }
  else if (something.innerText === "Depth-First") {
    dfs()
  }
  else {
    alert("Please select an algorithm")
  }
}

//init
function sped(s) {
  console.log(s)
  speed = s
}
function init() {
  document.getElementById("bfs").addEventListener("click", function () { change("algos", "Breadth-First", "bfs") });
  document.getElementById("bi-bfs").addEventListener("click", function () { change("algos", "Bi-Directional", "bi-bfs"); });
  document.getElementById("dfs").addEventListener("click", function () { change("algos", "Depth-First", "dfs"); });
  document.getElementById("clear").onclick = reset;
  document.getElementById("run").onclick = run;
  document.getElementById("lightning-fast").addEventListener("click", function () { change("speed", "Lightning", "lightning-fast"); sped(0); });
  document.getElementById("fast").addEventListener("click", function () { change("speed", "Fast", "fast"); sped(10); });
  document.getElementById("medium").addEventListener("click", function () { change("speed", "Medium", "medium"); sped(70); });
  document.getElementById("slow").addEventListener("click", function () { change("speed", "Slow", "slow"); sped(100); });
}

document.addEventListener('readystatechange', function () {
  if (document.readyState === "complete") {
    init();
  }
});
