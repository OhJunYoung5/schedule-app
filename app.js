let schedules =
JSON.parse(localStorage.getItem("schedules"))
|| [];

function addSchedule(){

  const date =
  document.getElementById("date").value;

  const memo =
  document.getElementById("memo").value;

  if(!date || !memo){
    alert("날짜와 일정을 입력해주세요");
    return;
  }

  schedules.push({
    id:Date.now(),
    date,
    memo
  });

  schedules.sort((a,b)=>
    new Date(a.date) - new Date(b.date)
  );

  saveData();

  document.getElementById("memo").value="";
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

function render(){

  const list =
  document.getElementById("schedule-list");

  list.innerHTML="";

  schedules.forEach(item=>{

    list.innerHTML += `
      <div class="card">

        <div class="date">
          ${item.date}
        </div>

        <div>
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
