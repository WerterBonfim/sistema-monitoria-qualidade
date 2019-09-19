import { Validators } from '@angular/forms';


export const DicionarioDeErros = {

    required: () => 'Campo obrigatório'
    , minLenght: (erro: any) => `Digite no minimo ${1}`
    , maxLength: (erro: any) => `Quantidade maxima: ${1}`


}

