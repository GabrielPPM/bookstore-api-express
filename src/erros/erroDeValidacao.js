import ErroBase from "./erroBase.js";

class ErroDeValidacao extends ErroBase(){
    constructor(){
        super("Um ou mais campos não cumprem os requisitos de validação", 400);
    }
}

export default ErroDeValidacao;