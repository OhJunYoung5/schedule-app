let schedules =
JSON.parse(localStorage.getItem("schedules"))
|| [];

function addSchedule(){

  const date = document.getElementById("date").value;
  const memo = document.getElementById("memo").value.trim();

  if(!date || !memo){
    alert("날짜와 일정을 입력해주세요");
    return;
  }

  schedules.push({
    id: Date.now(),
    date,
    memo,
    pay: ""
  });

  schedules.sort((a,b)=>
    new Date(a.date) - new Date(b.date)
  );

  saveData();

  document.getElementById("memo").value = "";
}

function deleteSchedule(id){

  if(!confirm("이 일정을 삭제할까요?")){
    return;
  }

  schedules =
  schedules.filter(item => item.id !== id);

  saveData();
}

function addPay(id){

  const item =
  schedules.find(item => item.id === id);

  const currentPay = item.pay || "";

  const newPay =
  prompt("일당을 입력하세요. 예: 150000", currentPay);

  if(newPay === null){
    return;
  }

  item.pay = newPay.replace(/,/g, "").trim();

  saveData();
}

function editSchedule(id){

  const item =
  schedules.find(item => item.id === id);

  const newDate =
  prompt("날짜를 수정하세요. 예: 2026-05-07", item.date);

  if(newDate === null){
    return;
  }

  const newMemo =
  prompt("일정을 수정하세요.", item.memo);

  if(newMemo === null){
    return;
  }

  const newPay =
  prompt("일당을 수정하세요. 없으면 비워두세요.", item.pay || "");

  if(newPay === null){
    return;
  }

  item.date = newDate.trim();
  item.memo = newMemo.trim();
  item.pay = newPay.replace(/,/g, "").trim();

  schedules.sort((a,b)=>
    new Date(a.date) - new Date(b.date)
  );

  saveData();
}

function saveData(){

  localStorage.setItem(
    "schedules",
    JSON.stringify(schedules)
  );

  render();
}

function getDayName(dateText){
  const days = ["일","월","화","수","목","금","토"];
  const date = new Date(dateText);
  return days[date.getDay()];
}

function formatDate(dateText){
  const date = new Date(dateText);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = getDayName(dateText);

  return `${month}월 ${day}일(${week})`;
}

function formatPay(pay){
  if(!pay) return "";

  const numberPay = Number(pay);

  if(isNaN(numberPay)){
    return "";
  }

  return numberPay.toLocaleString() + "원";
}

function render(){

  const list =
  document.getElementById("schedule-list");

  list.innerHTML = "";

  schedules.forEach(item=>{

    list.innerHTML += `
      <div class="card">

        <div class="card-top">
          <div class="date">
            ${formatDate(item.date)}
          </div>

          <div class="pay">
            ${formatPay(item.pay)}
          </div>
        </div>

        <div class="memo">
          ${item.memo}
        </div>

        <div class="button-row">
          <button onclick="editSchedule(${item.id})">
            수정
          </button>

          <button onclick="addPay(${item.id})">
            일당
          </button>

          <button onclick="deleteSchedule(${item.id})">
            삭제
          </button>
        </div>

      </div>
    `;
  });
}

render();
