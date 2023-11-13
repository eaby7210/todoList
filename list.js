const add = document.querySelector("#add-button");
const add_t = document.querySelector("#add-input");
const tsk_list = document.querySelector("#task-list");
const clearAll = document.querySelector("#clear");
const listCount = document.querySelector("#li-count");
const searchInput = document.querySelector("#search_input");
const sClear = document.querySelector("#search_clear");

sClear.addEventListener("click", (event) => {
  searchInput.value = "";
  for (i = 0; i < tsk_list.children.length; i++) {
    tsk_list.children[i].style.display = "flex";
  }
});
function filterlist(term) {
  // console.log(tsk_list.children)

  for (i = 0; i < tsk_list.children.length; i++) {
    let list_elem = tsk_list.children[i].innerText.toLowerCase();
    if (list_elem.length) {
      if (list_elem.indexOf(term.toLowerCase()) != -1) {
        tsk_list.children[i].style.display = "flex";
      } else {
        tsk_list.children[i].style.display = "none";
      }
    } else {
      tsk_list.children[i].style.display = "flex";
    }
  }
}

searchInput.addEventListener("keyup", (event) => {
  let searchT = searchInput.value.trim();
  filterlist(searchT);
});
function updateCount(accum) {
  let count = tsk_list.children.length;
  listCount.textContent = count;
}
add.addEventListener("click", (event) => {
  event.preventDefault();
  let tsk_txt = add_t.value.trim();
  let str = `<li class="li_elem"><span id="task_text" class="string">${String(
    tsk_txt
  )}</span><input class="task_edit" type="textarea"><i class="bi bi-pencil"></i><i class="bi bi-trash"></i></li>`;
  if (tsk_txt.length) {
    tsk_list.innerHTML += str;
    updateCount();
  }
  add_t.value = "";
});
tsk_list.addEventListener("click", (event) => {
  const task_target = event.target;
  const task_elem = task_target.parentElement;
  const input = task_elem.querySelector(".task_edit");
  const task_txt = task_elem.querySelector("#task_text");

  console.log(task_elem);
  //to delete
  if (task_target.classList.contains("bi-trash")) {
    task_elem.remove();
    updateCount();
  }
  //to make edit
  else if (task_target.classList.contains("bi-pencil")) {
    task_target.classList = ["bi bi-check"];
    input.setAttribute("value", task_txt.textContent);
    input.style.display = "flex";
    task_txt.textContent = "";
  }
  //to set edits
  else if (task_target.classList.contains("bi-check")) {
    console.log(input.value);
    task_txt.textContent = input.value;
    input.style.display = "none";
    task_target.classList = ["bi bi-pencil"];
  }
  //to strick
  else if (task_target.classList.contains("string")) {
    task_target.classList = ["strick"];
  }
  //to revert strick
  else if (task_target.classList.contains("strick")) {
    task_target.classList = ["string"];
  }
});
clearAll.addEventListener("click", (evetn) => {
  while (tsk_list.firstChild) {
    tsk_list.removeChild(tsk_list.firstChild);
  }
  updateCount();
});
