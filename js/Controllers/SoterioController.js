class SorteioController{
    constructor(){
        this._ease;
        this._difficulty;
        this.ajaxGet();
    }
    toRepair(arr){
        let validate= Math.abs(arr[0].v-arr[1].v2)
        let counter=0;
        console.log(arr,validate)
    }
    check(value,value2){
        let arr=[{v:0},{v2:0}];
        value.forEach(e => {
            arr[0].v+=e['alunos'];
        });
        value2.forEach(e => {
            arr[1].v2+=e['tutores'];      
        });
        arr.push(arr[0].v==arr[1].v2)
        return arr;
    }
    ajaxGet(){
        let ajax = new XMLHttpRequest();
        ajax.open("GET",'sorteio.php');
        ajax.send();
        ajax.onload=e=>{
            let res = JSON.parse(ajax.responseText)
            this.ease=res.facilidade;
            this.difficulty=res.dificuldade;
            !this.check(this.ease,this.difficulty)[2]?this.toRepair(this.check(this.ease,this.difficulty)):false
            console.log(this.ease,this.difficulty)
        }
        ajax.onerror=err=>{
            console.log(err)
        }
    }
    //SETs and GETs
    get difficulty(){return this._difficulty;}
    set difficulty(value){this._difficulty=value;}
    get ease(){return this._ease;}
    set ease(value){this._ease=value;}
}