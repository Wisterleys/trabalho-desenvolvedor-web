class PrintScreenController{
    constructor(obj){
        this._print_area=obj.print_area;
        this._btn_click=obj.btn_click;
        this.onPrint();
        
    }

    onPrint(){
        this.btn_click.addEventListener("click",e=>{
            console.log("chamou")
            window.print();
        })
    }
    //GETs and SETs
    get btn_click(){return this._btn_click;}
    get print_area(){return this._print_area;}
    //set print_area(value){this._print_area=value}
}