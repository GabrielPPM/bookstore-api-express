import ErroBase from "./erroBase.js";

class ErroDeRequisicao extends ErroBase{
    constructor(){
        super("Um ou mais dados fornecidos estão incorretos", 400);
    }
}

export default ErroDeRequisicao;