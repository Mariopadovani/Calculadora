const anteriorOperacaoText = document.querySelector("#operacao-anterior");
const atualOperacaoText = document.querySelector("#operacao-atual");
const botoes = document.querySelectorAll("#botoes button");

class Calcular {
    constructor(anteriorOperacaoText, atualOperacaoText) {
        this.anteriorOperacaoText = anteriorOperacaoText
        this.atualOperacaoText = atualOperacaoText
        this.atualOperacao = "";
    }
    //Adiciona um digito na tela
    addDig(digito) {
        //Vai cerificar se na tela já possui um ponto
        if(digito === "." && this.atualOperacaoText.innerText.includes(".")){
            return;
        }

        this.atualOperacao = digito
        this.updateScreen()
    }


    //processar as operações
    processOperation(operation){

        //Verificar se o número atual está vazio
        if(this.atualOperacaoText.innerText === "" && operation !== "C"){
               //Mudança de operação
            if(this.anteriorOperacaoText.innerText !== ""){
              this.changeOperation(operation);

            } return;
        }
        //Pegar os valores de "anterior" e "atual"
        let operationValue;
        const anterior = +this.anteriorOperacaoText.innerText.split(" ")[0] ;
        const atual = +this.atualOperacaoText.innerText;

        switch(operation){
            case "+":
                operationValue = anterior + atual
                this.updateScreen(operationValue, operation, atual, anterior)
                break;
            case "-":
                operationValue = anterior - atual
                this.updateScreen(operationValue, operation, atual, anterior)
                break;
            case "/":
                operationValue = anterior / atual
                this.updateScreen(operationValue, operation, atual, anterior)
                break;
            case "*":
                operationValue = anterior * atual
                this.updateScreen(operationValue, operation, atual, anterior)
                break;
            case "DEL":
                this.processoDel();
                break;
            case "CE":
                this.processoCE();
                break;
            case "C":
                this.processoC();
                break;
            case "=":
                this.processoigual();
                break;
            default:
                return;
        }

    }
    //Muda os valores da tela da calculadora
    updateScreen(
        operationValue = null, 
        operation = null, 
        atual = null, 
        anterior = null
    ){
        console.log(operationValue, operation, atual, anterior);
        
        if(operationValue === null){
            //Anexar um número ao valor atual
            this.atualOperacaoText.innerText += this.atualOperacao;
        } else{
            //Se o valor for zero, adicione o "atual"
            if(anterior === 0){
                operationValue = atual
            }
            //Adicione o valor atual para anterior(Tela lá em cima na calculadora)
            this.anteriorOperacaoText.innerText = `${operationValue} ${operation}`
            this.atualOperacaoText.innerText =  "";
        }
       
    }
    //Método para mudar o operador
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"]
        //Caso não possua a operação no código, ele não irá retornar nada
        if(!mathOperations.includes(operation)) {
            return 
        }
        this.anteriorOperacaoText.innerText = this.anteriorOperacaoText.innerText.slice(0, -1) + operation;
    }
    //Deletar o último digito
    processoDel() {
        this.atualOperacaoText.innerText = this.atualOperacaoText.innerText.slice(0, -1);

    }
    //limpar o número atual
    processoCE(){
        this.atualOperacaoText.innerText = "";
    }
    // Limpar tudo
    processoC(){
        this.atualOperacaoText.innerText = "";
        this.anteriorOperacaoText.innerText = "";
    }
    //Processo do botão igual
    processoigual(){
        
        const operation = anteriorOperacaoText.innerText.split(" ")[1];

        this.processOperation(operation);

    }
}

const calc = new Calcular(anteriorOperacaoText, atualOperacaoText);


botoes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){ /*'+' é um conversor para numero */
         calc.addDig(value);
        } else{
            calc.processOperation(value);
        }

    });
});