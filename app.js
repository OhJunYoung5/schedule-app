let schedules = JSON.parse(localStorage.getItem("schedules") || "[]");

const dateInput = document.getElementById("date");
const memoInput = document.getElementById("memo");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addSchedule);

function addSchedule(){
  const date = dateInput.value;
  const memo = memoInput.value.trim();

  if(!date || !memo){
    alert("날짜와 일정을 입력해주세요");
    return;
  }

  schedules.push({
    id: Date.now(),
    date: date,
    memo: memo,
    pay: ""
  });

  sortSchedules();
  saveSchedules();

  memoInput.value = "";
}

function deleteSchedule(id){
  if(!confirm("이 일정을 삭제할까요?")) return;

  schedules = schedules.filter(item => item.id !== id);
  saveSchedules();
}

function addPay(id){
  const item = schedules.find(item => item.id === id);
  if(!item) return;

  const pay = prompt("일당을 입력하세요. 예: 150000", item.pay || "");
  if(pay === null) return;

  item.pay = pay.replace(/,/g, "").trim();
  saveSchedules();
}

function editSchedule(id){
  const item = schedules.find(item => item.id === id);
  if(!item) return;

  const card = document.getElementById("card-" + id);
  if(!card) return;

  card.innerHTML = `
    <div class="edit-box">
      <input type="date" id="edit-date-${id}" value="${escapeHtml(item.date)}">

      <textarea id="edit-memo-${id}" placeholder="일정을 입력하세요">${escapeHtml(item.memo)}</textarea>

      <div class="button-row">
        <button type="button" onclick="saveEdit(${id})">저장</button>
        <button type="button" onclick="render()">취소</button>
      </div>
    </div>
  `;
}

function saveEdit(id){
  const item = schedules.find(item => item.id === id);
  if(!item) return;

  const newDate = document.getElementById("edit-date-" + id).value;
  const newMemo = document.getElementById("edit-memo-" + id).value.trim();

  if(!newDate || !newMemo){
    alert("날짜와 일정을 입력해주세요");
    return;
  }

  item.date = newDate;
  item.memo = newMemo;

  sortSchedules();
  saveSchedules();
}

function sortSchedules(){
  schedules.sort((a,b) => new Date(a.date) - new Date(b.date));
}

function saveSchedules(){
  localStorage.setItem("schedules", JSON.stringify(schedules));
  render();
}

function getDayName(dateText){
  const days = ["일","월","화","수","목","금","토"];
  const date = new Date(dateText + "T00:00:00");
  return days[date.getDay()];
}

function formatDate(dateText){
  const date = new Date(dateText + "T00:00:00");
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = getDayName(dateText);

  return `${month}월 ${day}일(${week})`;
}

function formatPay(pay){
  if(!pay) return "";

  const numberPay = Number(pay);
  if(isNaN(numberPay)) return "";

  return numberPay.toLocaleString() + "원";
}

function escapeHtml(text){
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render(){
  const list = document.getElementById("schedule-list");
  list.innerHTML = "";

  schedules.forEach(item => {
    list.innerHTML += `
      <div class="card" id="card-${item.id}">
        <div class="card-top">
          <div class="date">${formatDate(item.date)}</div>
          <div class="pay">${formatPay(item.pay)}</div>
        </div>

        <div class="memo">${escapeHtml(item.memo)}</div>

        <div class="button-row">
          <button type="button" onclick="editSchedule(${item.id})">수정</button>
          <button type="button" onclick="addPay(${item.id})">일당</button>
          <button type="button" onclick="deleteSchedule(${item.id})">삭제</button>
        </div>
      </div>
    `;
  });
}

render();
