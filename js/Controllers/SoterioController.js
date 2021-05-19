class SorteioController{
    constructor(obj){
        // 0 = ease | 1 = difficulty
        this._printing_place=obj.place;
        this._ease;
        this._difficulty;
        this._origin_ease;
        this._origin_difficulty;
        this._current_list=[];
        this.general_list=[];

        // Methods
        this.ajaxGetOrigin();
        this.onBtn();
        this.onGo();
    }
    auto(){}
    manual(){

    }
    test(val){
        console.log(val)
        console.log(val[0].v+val[1].v2)
    }
    print(){
        this.general_list.forEach(res=>{
            this.printTemplate({nameTutor:res.tutor,alunos:res.alunos})
        })
    }
    printTemplate(obj){
       
       let ul = this.createTags({place:this.printing_place,tag:"ul",class:"list-group col-sm-6"})
       this.createTags({place:ul,tag:"h5",class:"list-group-item bg-dark  text-light",insertTag:obj.nameTutor})
       obj.alunos.forEach(aluno=>{
        this.createTags({place:ul,tag:"li",class:"list-group-item",insertTag:aluno})
       })
    }
    found(array,value){
        return array.indexOf(value)>-1?false:true//Retorna falso se encontrar o valor e true se não encontrar
    }
    roulette(){
        console.log(this.ease)
         let check=false;
         while (!check) {
             let arr=[]
             let tutor = this.toRaffle(this.ease.length-1,0);
             for (let index = 0; index < this.ease[tutor].alunos; index++) {
                let aluno = this.toRaffle(this.difficulty.length-1,0);
                if(this.difficulty[aluno]){
                    arr.push(this.difficulty[aluno].nome)
                    this.difficulty.splice(aluno,1)
                }
                else{
                    let aluno = this.toRaffle(this.origin_difficulty.length-1,0);
                   arr.push(`<p class="container-fluid bg-danger text-light">${this.origin_difficulty[aluno].nome}<p>`)
                }
             }
             this.general_list.push({tutor:this.ease[tutor].nome,alunos:arr})
             this.ease.splice(tutor,1);
             this.ease.length<1?check=true:0
         }
         this.print();
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
                            let val = this.check(this.ease,this.difficulty)
                            this.test(val)
                            this.roulette();
                            this.current_list=[]
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
                            let val = this.check(this.ease,this.difficulty)
                            this.test(val)
                            this.roulette()
                            this.current_list=[]
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
    ajaxGetOrigin(){
        let ajax = new XMLHttpRequest();
        ajax.open("GET",'php/sorteio.php');
        ajax.send();
        ajax.onload=e=>{
            let res = JSON.parse(ajax.responseText)
            console.log(res)
            this.origin_ease=res.facilidade;
            this.origin_difficulty=res.dificuldade;
        }
        ajax.onerror=err=>{
            console.log(err)
        }
    }
    ajaxGet(){
        let ajax = new XMLHttpRequest();
        ajax.open("GET",'php/sorteio.php');
        ajax.send();
        ajax.onload=e=>{
            let res = JSON.parse(ajax.responseText)
            this.ease=res.facilidade;
            this.difficulty=res.dificuldade;
            !this.check(this.ease,this.difficulty)[2]?this.toRepair(this.check(this.ease,this.difficulty)):false
        }
        ajax.onerror=err=>{
            console.log(err)
        }
    }
    createTags(obj={}){ //Método modelo para criar TAGs na tela
        /*
        exemplo
        obj={
            place:local,
            tag:nome da tag que deseja criar,
            insertTag: É para inserir uma tag dentro dessa nova tag criada ou só uma mensagem dentro da tag
            tudo que adicionar depois disso é considerado atributo
            a chave é considerada o nome do atributo e o valor é o valor mesmo rsrs
        }
        */
        let tag;
        if(obj.place && obj.tag){
            tag = document.createElement(obj.tag);
            for(let key in obj){
                if(key != "place" && key != "tag" && key != "insertTag"){
                    let att = document.createAttribute(key)
                    att.value=obj[key];
                    tag.setAttributeNode(att)
                }
            }
            obj.insertTag?tag.innerHTML=obj.insertTag:0
            obj.place.appendChild(tag);
        }
        return tag
    }
    //LISTEN
    onGo(){
        document.querySelector("#go").addEventListener("click",e=>{
            this.ajaxGet();
        })
    }
    onBtn(){
        document.querySelector("#button").addEventListener('click',e=>{
            document.querySelector("#ball").classList.toggle("ballR")
            setTimeout(e=>{
                document.querySelector("#button").classList.toggle("bg-danger")
                document.querySelector("#button p").innerHTML = document.querySelector("#button p").innerHTML=="Manual"?"Auto":"Manual"
            },1000)
        })
    }
    //SETs and GETs
    get printing_place(){return this._printing_place;}
    get current_list(){return this._current_list;}
    set current_list(value){this._current_list=value;}
    get difficulty(){return this._difficulty;}
    set difficulty(value){this._difficulty=value;}
    get ease(){return this._ease;}
    set ease(value){this._ease=value;}
    get origin_ease(){return this._origin_ease;}
    set origin_ease(value){this._origin_ease=value;}
    get origin_difficulty(){return this._origin_difficulty;}
    set origin_difficulty(value){this._origin_difficulty=value;}
}
