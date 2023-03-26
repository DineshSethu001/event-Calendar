const calendar=document.querySelector('.calendar');
const monthBanner=document.querySelector('#month');
let navigation=0;
let events=localStorage.getItem("events")?JSON.parse(localStorage.getItem("events")):[];
const weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
function loadCalendar(){
    const dt=new Date();
    if(navigation !=0){
        dt.setMonth(new Date().getMonth() + navigation);
    }
    const day=dt.getDate();
    const month=dt.getMonth();
    const year=dt.getFullYear();
    monthBanner.innerHTML=`${dt.toLocaleDateString
        ("en-us",
            {
                month:"long",
            })} ${year}`;
            
    

    calendar.innerHTML=" ";
    const dayInMonth=new Date(year,month+1,0).getDate(); 
    const firstDayofMonth=new Date(year,month,1);
    const dateText=firstDayofMonth.toLocaleDateString
    ('en-us',{
        weekday:"long",
        year:"numeric",
        month:"numeric",
        day:"numeric",
    });    
    const dayString=dateText.split(', ')[0];
    const emptyDays=weekDays.indexOf(dayString);
    for(let i=1;i <= dayInMonth + emptyDays;i++){
        const dayBox=document.createElement("div");
        dayBox.classList.add("day");
        const dateText=`${i-emptyDays}-${month+1}-${year}`;
        if(i > emptyDays){
            dayBox.innerText=i-emptyDays;
            const eventOfTheDay=events.find((e)=>e.date==dateText)
            if(i-emptyDays===day && navigation === 0){
                dayBox.id="currentDay";

            }
            dayBox.addEventListener("click",()=>{
                showModal();
            })
        }
        else{
            dayBox.classList.add("plain")
        }
        
        calendar.append(dayBox);

    }
}
function buttons(){
    const btnBack=document.querySelector("#btnBack");
    const btnNext=document.querySelector("#btnNext");
    btnBack.addEventListener('click',()=>{
        navigation--;
        loadCalendar();

    });
    btnNext.addEventListener('click',()=>{
        navigation++;
        loadCalendar();

    })
    

}

const modal=document.querySelector("#modal");
function showModal(){
    modal.style.display="block"; 
}
buttons();
loadCalendar();