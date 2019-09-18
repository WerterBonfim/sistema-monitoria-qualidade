import { Util } from './../../utils';
import { ValidatorFn, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

export class InputOptions {

    constructor(
        public label = "",
        public minlength = 0,
        public maxlength = 300,
        public required = false,
        public pattern = "",
        public mensagemDeSucesso = "Ok",
        public mensagemDeErro = "Inválido",

    ) {

    }



    public listarValidacoes(controle: AbstractControl): ValidationErrors {

        const validacoes: ValidatorFn[] = [];        

        if (this.required) {
            validacoes.push(Validators.required);
        }

        if (this.pattern) {
            validacoes.push(Validators.pattern(this.pattern))
        }

        if (this.maxlength) {
            validacoes.push(Validators.maxLength(this.maxlength))
        }

        // TODO: Aplicar demais validações

        return Validators.compose(validacoes);

    }

}