const CONF={
    place:document.querySelector("#imp"),//Espaço onde ocorre as impressões
    warning:document.querySelector("#warning")//MODAL
}
const CONF_PRINT={
    print_area:document.querySelector(".print"),
    btn_click:document.querySelector("#btn-print")
}
new SorteioController(CONF);
new PrintScreenController(CONF_PRINT);

// CHECKLIST
function checkeds(lis){
    if(localStorage.getItem('lis')){
        let l = JSON.parse(localStorage.getItem('lis'));
        lis.forEach((li,i)=>{
            li.querySelector("input").checked=l[i]?true:false;
            l[i]?li.classList.add("active"):li.classList.remove("active")
        })
    }
}
function checkedsSalve(lis){
    let ve=[];
    lis.forEach(li=>{
        ve.push(li.querySelector("input").checked);
    })
    localStorage.setItem("lis",JSON.stringify(ve))
}
let lis = document.querySelectorAll(".list-group-item");
checkeds(lis)
lis.forEach(li=>{
    li.addEventListener("click",e=>{
        checkedsSalve(lis);
        checkeds(lis);
    })
})