class SorteioController{
    constructor(){
        // 0 = ease | 1 = difficulty
        this._ease;
        this._difficulty;
        this._current_list=[];
        this.general_list=[];
        this.ajaxGet();
    }
    print(){console.log(this.general_list)}
    roulette(){
        let validate= this.difficulty.length-1;
        let counter=0;
        let loop = setInterval(()=>{
            console.log("!")
            let t = this.toRaffle(this.difficulty.length-1,0);
            let a = this.toRaffle(this.ease.length-1,0);
            if(this.difficulty.indexOf(this.difficulty[t])>-1){
                if(this.ease.indexOf(this.ease[a])>-1){
                    this.general_list.push({tutor:this.difficulty[t].nome,aluno:this.ease[a].nome})
                    this.ease.splice(a,1);
                    this.difficulty.splice(t,1);
                } 
            }
            if(this.ease.indexOf(this.ease[a])>-1){
                if(this.difficulty.indexOf(this.difficulty[t])>-1){
                    this.general_list.push({tutor:this.difficulty[t].nome,aluno:this.ease[a].nome})
                    this.ease.splice(a,1);
                    this.difficulty.splice(t,1);
                }
            }
            console.log(this.ease.length,this.difficulty.length)
            if(this.ease.length<1||this.difficulty.length<1){this.print();clearInterval(loop)}
        },10)
    }
    toRaffle(max,min){
        return Math.round(Math.random() * (max - min) + min);
    }
    toRepair(arr){
        let validate= Math.abs(arr[0].v-arr[1].v2)
        let counter=0;
        let turn = arr[0].v<arr[1].v2?0:1
        let loop = setInterval(()=>{
            let num = turn<1?this.toRaffle(this.ease.length-1,0):this.toRaffle(this.difficulty.length-1,0)
            switch(turn){
                case 0:
                    if(this.current_list.indexOf(this.ease[num].nome)<0){
                        this.ease[num].alunos+=1;
                        this.current_list.push(this.ease[num].nome)
                        counter++;
                        if(counter>=validate&&this.check(this.ease,this.difficulty)[2]){
                            clearInterval(loop);
                            console.log(this.check(this.ease,this.difficulty),this.current_list)
                            this.roulette();
                        }
                    }
                    break;
                case 1:
                    if(this.current_list.indexOf(this.difficulty[num].nome)<0){
                        this.difficulty[num].tutores+=1;
                        this.current_list.push(this.difficulty[num].nome)
                        counter++;
                        if(counter>=validate&&this.check(this.ease,this.difficulty)[2]){
                            clearInterval(loop);
                            console.log(this.check(this.ease,this.difficulty))
                            this.roulette()
                        }
                    }
                    break;
            }
        },100)
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
        ajax.open("GET",'php/sorteio.php');
        ajax.send();
        ajax.onload=e=>{
            let res = JSON.parse(ajax.responseText)
            document.body.innerHTML=JSON.stringify(res)
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
    get current_list(){return this._current_list;}
    set current_list(value){this._current_list=value;}
    get difficulty(){return this._difficulty;}
    set difficulty(value){this._difficulty=value;}
    get ease(){return this._ease;}
    set ease(value){this._ease=value;}
}
