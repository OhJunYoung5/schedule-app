let schedules =
JSON.parse(localStorage.getItem("schedules"))
|| [];

function addSchedule(){

  const date =
  document.getElementById("date").value;

  const memo =
  document.getElementById("memo").value;

  const pay =
  document.getElementById("pay").value;

  if(!date || !memo){
    alert("날짜와 일정을 입력해주세요");
    return;
  }

  schedules.push({
    id:Date.now(),
    date,
    memo,
    pay
  });

  schedules.sort((a,b)=>
    new Date(a.date) - new Date(b.date)
  );

  saveData();

  document.getElementById("memo").value="";
  document.getElementById("pay").value="";
}

function deleteSchedule(id){

  schedules =
  schedules.filter(v=>v.id!==id);

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
  return Number(pay).toLocaleString() + "원";
}

function render(){

  const list =
  document.getElementById("schedule-list");

  list.innerHTML="";

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

        <button
          onclick="deleteSchedule(${item.id})"
          style="margin-top:12px;"
        >
          삭제
        </button>

      </div>
    `;
  });
}

render();
