class SorteioController{
    constructor(){
        this._facilidade;
        this._dificuldade;
        this.ajaxGet();
    }
    conferir(value,value2){
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
            this.facilidade=res.facilidade;
            this.dificuldade=res.dificuldade;
            console.log(this.conferir(this.facilidade,this.dificuldade))
            console.log(this.facilidade,this.dificuldade)
        }
        ajax.onerror=err=>{
            console.log(err)
        }
    }
    //SETs and GETs
    get dificuldade(){return this._dificuldade;}
    set dificuldade(value){this._dificuldade=value;}
    get facilidade(){return this._facilidade;}
    set facilidade(value){this._facilidade=value;}
}