class SorteioController{
    constructor(){
        this._facilidade;
        this._dificuldade;
        this.ajaxGet();
    }
    conferir(value,value2){
        let arr=[0,0];
        value.forEach(e => {
            arr[0]+=e['alunos'];
        });
        value2.forEach(e => {
            arr[1]+=e['tutores'];      
        });
        console.log(arr)
    }
    ajaxGet(){
        let ajax = new XMLHttpRequest();
        ajax.open("GET",'sorteio.php');
        ajax.send();
        ajax.onload=e=>{
            let res = JSON.parse(ajax.responseText)
            this.facilidade=res.facilidade;
            this.dificuldade=res.dificuldade;
            this.conferir(this.facilidade,this.dificuldade)
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