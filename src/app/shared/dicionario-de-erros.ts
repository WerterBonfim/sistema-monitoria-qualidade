import { Validators } from '@angular/forms';

Validators.minLength

export const DicionarioDeErros = {

    required: 'Campo obrigatório'
    ,minLenght: (qtdMinima: number) => `Digite no minimo ${qtdMinima}`
    ,maxLength: (qtdMaxima: number) => `Quantidade maxima: ${qtdMaxima}`
    

}