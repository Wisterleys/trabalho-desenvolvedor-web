class SorteioController{
    constructor(obj){
        // 0 = ease | 1 = difficulty
        this._printing_place=obj.place;
        this._warning=obj.warning
        this.manualmente=false
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
        this.onModal();
        this.onSearch();
    }
    toRepairAuto(n){
        let turn = n
        let validate = Math.abs(this.ease.length-this.difficulty.length)
        let counter=0;
        let loop = true
       while(loop){
            let num = turn<2?this.toRaffle(this.ease.length-1,0):this.toRaffle(this.difficulty.length-1,0)
            switch(turn){
                case 1:
                    if(this.current_list.length<this.ease.length){
                        if(this.current_list.indexOf(this.ease[num].nome)<0){
                            this.ease[num].alunos+=1;
                            this.current_list.push(this.ease[num].nome)
                            counter++;
                            if(counter>=validate&&this.check(this.ease,this.difficulty)[2]){
                                loop=false;
                                this.roulette();
                                this.current_list=[]
                                document.querySelector("#go").disabled=false;
                            }
                    }
                    }else{
                        //Caso a quantidade de tutor e bem menor então e é preciso repitir sorteio com o mesmo tutor
                        if(counter>=this.current_list.length){
                            this.ease[num].alunos+=1;
                            this.current_list.push(this.ease[num].nome)
                            counter++;
                            if(counter>=validate&&this.check(this.ease,this.difficulty)[2]){
                                loop=false;
                                this.roulette();
                                this.current_list=[]
                                document.querySelector("#go").disabled=false;
                            }
                        }
                    }
                    break;
                case 2:
                    if(this.current_list.length<this.difficulty.length){
                        if(this.current_list.indexOf(this.difficulty[num].nome)<0){
                            this.difficulty[num].tutores+=1;
                            this.current_list.push(this.difficulty[num].nome)
                            counter++;
                            if(counter>=validate&&this.check(this.ease,this.difficulty)[2]){
                                loop=false;
                                this.roulette()
                                this.current_list=[]
                                document.querySelector("#go").disabled=false;
                            }
                        }

                    }
                    else{
                        //Caso a quantidade de aluno e bem menor então e é preciso repitir sorteio com o mesmo tutor
                        if(counter>=this.current_list.length){
                            this.difficulty[num].tutores+=1;
                            this.current_list.push(this.difficulty[num].nome)
                            counter++;
                            if(counter>=validate&&this.check(this.ease,this.difficulty)[2]){
                                loop=false;
                                this.roulette();
                                this.current_list=[]
                                document.querySelector("#go").disabled=false;
                            }
                        }
                    }
                    break;
            }
        }
        this.print();
    }
    auto(){
        this.manualmente=false
        this.ease.map(e=>e.alunos=1)
        this.difficulty.map(e=>e.tutores=1)
        if(this.ease.length<this.difficulty.length)this.toRepairAuto(1)
        else if(this.ease.length>this.difficulty.length)this.toRepairAuto(2)
        else this.roulette();
    }
    manual(){
        this.manualmente=true
        this.toRepair(this.check(this.ease,this.difficulty))
    }
    search(value){
        let vet=[];
        let vali=true;
        for (let l = 0; l < this.general_list.length; l++) {
            if(this.general_list[l].tutor.search(value)>-1){vali=false;vet.push(l)}
                for (let i = 0; i < this.general_list[l].alunos.length; i++) {
                    if(this.general_list[l].alunos[i].search(value)>-1){vet.push(l)}
                    
                }
        }
        return vet;
    }
    test(val){
        console.log(val)
        console.log(val[0].v+val[1].v2)
    }
    clear(el){
        el.forEach(e=>{e.remove()})
    }
    print(vetor=[]){
        let v=true;
        this.clear(document.querySelectorAll(".list-group"))
        vetor.forEach(e=>{isNaN(e)?v=false:0})
        if(vetor.length>0&&v){
            vetor.forEach(index => {
                this.general_list[index]?
                this.printTemplate({nameTutor:this.general_list[index].tutor,alunos:this.general_list[index].alunos}):0
            });
        }else{
            this.general_list.forEach(res=>{
                this.printTemplate({nameTutor:res.tutor,alunos:res.alunos})
            })
            
        }
    }
    printTemplate(obj){
       let ul = this.createTags({place:this.printing_place,tag:"ul",class:"list-group col-sm-6"})
       this.createTags({place:ul,tag:"h5",class:"list-group-item bg-dark  text-light",insertTag:`<p style="float:right;opacity:0.5;margin:0px;">Tutor</p><p style="clear:both;" class="search">${obj.nameTutor}</p>`})
       obj.alunos.forEach(aluno=>{
        this.createTags({place:ul,tag:"li",class:"list-group-item search",insertTag:aluno})
       })
    }
    found(array,value){
        return array.indexOf(value)>-1?false:true//Retorna falso se encontrar o valor e true se não encontrar
    }
    roulette(manual=false){
        this.general_list=[];
         let check=false;
         while (!check) {//Loop para soertear
             let arr=[]
             let tutor = this.toRaffle(this.ease.length-1,0);//Sorteio de tutor
             let index = 0;
             while ( index < this.ease[tutor].alunos) {
                let aluno = this.toRaffle(this.difficulty.length-1,0);//Sorteio de aluno
                    if(!this.manualmente){
                        if(arr.indexOf(this.difficulty[aluno].nome)<0){
                            arr.push(this.difficulty[aluno].nome)
                            this.difficulty[aluno].tutores--;
                            this.difficulty[aluno].tutores<1?this.difficulty.splice(aluno,1):0
                            index++
                        }
                    }else{
                            arr.push(this.difficulty[aluno].nome)
                            this.difficulty[aluno].tutores--;
                            this.difficulty[aluno].tutores<1?this.difficulty.splice(aluno,1):0
                            index++
                    }
             }
             this.general_list.push({tutor:this.ease[tutor].nome,alunos:arr})
             this.ease.splice(tutor,1)
             this.ease.length<1?check=true:0
             
            
        }
         this.print();
         manual?document.querySelector("#go").disabled=false:0;
    }
    toRaffle(max,min){
        return Math.round(Math.random() * (max - min) + min);
    }
    warn(msg){
        document.querySelector("#sw").innerHTML=msg
        this.warning.classList.add("fall")
    }
    toRepair(arr){
        (arr[0].v==arr[1].v2)?this.roulette(true)
        :this.warn(`Precisa igualar manualmente os valore nos dois array. <br><br> Olha a diferença: (${arr[0].v}) (${arr[1].v2})`);
        
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
            document.querySelector("#button p").innerHTML=="Manualmente"?this.manual():this.auto()
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
   
    onSearch(){
        document.querySelector("#btn-search").addEventListener("click",e=>{
           this.print(this.search(document.querySelector("#search").value))
           document.querySelector("#btn-search").disabled=true
           setTimeout(()=>{document.querySelector("#btn-search").disabled=false},3000)
        })
    }
    onModal(){
        document.querySelector("#x").addEventListener("click",e=>{
            this.warning.classList.toggle("fall")
            document.querySelector("#go").disabled=false;
        })
    }
    onGo(){
        document.querySelector("#go").addEventListener("click",e=>{
            this.ajaxGet();
            document.querySelector("#go").disabled=true;
        })
    }
    onBtn(){
        document.querySelector("#button").addEventListener('click',e=>{
            document.querySelector("#ball").classList.toggle("ballR")
            setTimeout(e=>{
                document.querySelector("#button").classList.toggle("bg-danger")
                if(document.querySelector("#button p").innerHTML=="Manualmente"){
                    document.querySelector("#button p").innerHTML="Auto";
                    document.querySelector("#button p").style.textAlign="center";

                }else{
                    document.querySelector("#button p").innerHTML="Manualmente";
                    document.querySelector("#button p").style.textAlign="left";
                }
                
            },1000)
        })
    }
    //SETs and GETs
    get warning(){return this._warning;}
    set warning(value){this._warning=value;}
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
