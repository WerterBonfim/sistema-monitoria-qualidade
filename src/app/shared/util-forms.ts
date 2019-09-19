import { Injectable } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, FormGroup, FormArray } from '@angular/forms';

import { has, every } from 'lodash';
import { Observable, from } from 'rxjs';
import {  mergeMap, map } from 'rxjs/operators';
import { Util } from './utils';


@Injectable({
    providedIn: "root"
})

export class UtilForms {

    constructor(
        private _formBuilder: FormBuilder        
    ) {
    }

    static criarControle(formBuilder: FormBuilder, valorInicial: string, validacoes: (ValidatorFn | null | undefined)[] = []): AbstractControl {

        //return formBuilder.control(valorInicial, { updateOn: 'change', validators: Validators.compose(validacoes) } )
        return formBuilder.control(valorInicial, Validators.compose(validacoes)  );

    }


    public criarControle(validacoes: (ValidatorFn | null | undefined)[] = [], valorInicial: any = ''): AbstractControl {

        return UtilForms.criarControle(this._formBuilder, valorInicial, validacoes);

    }

    public criarControleRequerido(valorInicial: any = ''): AbstractControl {

        return UtilForms.criarControle(this._formBuilder, valorInicial, [Validators.required]);

    }


    //#region [ Validações ]

    public aplicarValidacoesCustomizada(formulario: FormGroup, config: { validacoes: (ValidatorFn[] | null), onlySelf?: boolean, emitEvent?: boolean }, ...nomeDosControles: string[]): void {

        nomeDosControles.forEach(nomeDoControle => {

            let controle = formulario.get(nomeDoControle);
            if (controle) {
                controle.setValidators(Validators.compose(config.validacoes));
                controle.updateValueAndValidity({ onlySelf: config.onlySelf, emitEvent: config.emitEvent });
            }

        });

    }

    //#endregion



    /**
   * Aplica uma nova validação nos controles definidos no paramentro @param nomeDosControles   
   * 
   * @param Validações a serem aplicadas no component
   * @param nomeDosControles array com o nome dos controles a serem atualizados com a nova validação
   */
    public atualizarValidacao(formulario: FormGroup, validacoes: (ValidatorFn[] | null), ...nomeDosControles: string[]): void {

        nomeDosControles.forEach(nomeDoControle => {

            this.atualizarValidacaoControle(formulario, validacoes, nomeDoControle);

        });

    }

    public atualizarValidacaoPeloArrayDeControles(formulario: FormGroup, validacoes: (ValidatorFn[] | null), nomeDosControles: string[]): void {

        nomeDosControles.forEach(nomeDoControle => {

            this.atualizarValidacaoControle(formulario, validacoes, nomeDoControle);

        });

    }

    public atualizarValidacaoControle(formulario: FormGroup, validacoes: (ValidatorFn[] | null), nomeDoControle: string): void {

        formulario.get(nomeDoControle).setValidators(Validators.compose(validacoes));
        formulario.get(nomeDoControle).updateValueAndValidity();

    }

    public apagarValoresDosControles(formulario: FormGroup, ...nomeDosControles: string[]): void {

        nomeDosControles.forEach(nomeDoControle => {
            formulario.get(nomeDoControle).setValue('');
        });

    }


    public static buscarTodosOsFormGroups(form: FormGroup): FormGroup[] {

        const resultado = Object.keys(form.controls)
            .map(x => form.get(x))
            .filter(x => (x instanceof FormGroup) === true);

        return resultado as FormGroup[];
    }

    public static encontrarControle(form: FormGroup | FormArray): { [key: string]: any; } | null {

        let controleEncontrado = false;

        const resultado = Object.keys(form.controls).reduce((acc, key) => {
            const control = form.get(key);
            const formCorrente = (control instanceof FormGroup || control instanceof FormArray)
                ? this.encontrarControle(control)
                : control;


            if (formCorrente)
                controleEncontrado = true;


            return formCorrente;

        }, {} as { [key: string]: any; });

        return controleEncontrado ? resultado : null;

    }

    public encontrarTodosOsErros(form: FormGroup | FormArray): { [key: string]: any; } | null {
        let hasError = false;
        const result = Object.keys(form.controls).reduce((acc, key) => {
            const control = form.get(key);
            const errors = (control instanceof FormGroup || control instanceof FormArray)
                ? this.encontrarTodosOsErros(control)
                : control.errors;
            if (errors) {
                acc[key] = errors;
                hasError = true;
            }
            return acc;
        }, {} as { [key: string]: any; });
        return hasError ? result : null;
    }

    private buscarNomeDoControleRequeridoOuComErroApi(erros: object): string | null {

        if (Util.objetoSemConteudo(erros)) {
            return null;
        }

        const primeiraPropriedade = Object.keys(erros)[0];
        const propriedadeEUmControle = has(erros[primeiraPropriedade], 'required') ||
            has(erros[primeiraPropriedade], 'erroApi');
        if (propriedadeEUmControle) {
            return primeiraPropriedade;
        }

        return this.buscarNomeDoControleRequeridoOuComErroApi(erros[primeiraPropriedade]);

    }


    public moveScrollParaOPrimeiroErro(formulario: FormGroup): void {

        let controles = this.encontrarTodosOsErros(formulario);
        const nomeCampo = this.buscarNomeDoControleRequeridoOuComErroApi(controles);
        this.scrollParaOInputComErro(nomeCampo);

    }

    public moverScrollParaOPrimeiroErroEncontrado(erros: any[], dePara: any): void {

        if (Util.objetoSemConteudo(erros))
            return;

        const primeiraPropriedade = erros
            .map(x => x.property)
            .map(x => dePara[x])
            .find(x => x === x);

        if (Util.objetoSemConteudo(primeiraPropriedade))
            return;

        this.scrollParaOInputComErro(primeiraPropriedade);
    }

    private scrollParaOInputComErro(formControlName: string): void {

        let inputsEncontrado = this.buscarInputComErro(formControlName);

        if (Util.objetoSemConteudo(inputsEncontrado))
            return;

        let inputEncontrado = this.buscarPrimeiroElementoInvalido(inputsEncontrado);

        const comportamento = { behavior: "smooth", block: "center", inline: "center" } as ScrollIntoViewOptions;
        inputEncontrado.scrollIntoView(comportamento);

    }

    private buscarInputComErro(formControlName: string): NodeListOf<Element> {

        const inputQuery = `[formcontrolname="${formControlName}"]`;
        let inputsEncontrado = document.querySelectorAll(inputQuery);

        if (inputsEncontrado.length > 0)
            return inputsEncontrado;

        inputsEncontrado = document.querySelectorAll(".has-error");
        if (inputsEncontrado.length > 0)
            return inputsEncontrado;

        //TODO: Adicionar uma nova query para buscar os erros encontrados na tela.
        return null;
    }

    /**
     * Busco o primeiro elemento com a class 'ng-invalid', 
     * caso eu não consiga encontrar ( ainda não foi aplicado a classe na view)
     * obtem o primeiro elemento da lista.
     */
    private buscarPrimeiroElementoInvalido(elementos: NodeListOf<Element>): Element {

        let inputEncontrado = Array.from(elementos)
            .find(x => x.classList.contains('ng-invalid'));

        inputEncontrado = inputEncontrado || elementos[0];
        return inputEncontrado;
    }

    

    public verificaSeOFormularioDeveSerValidado(
        formulario: FormGroup,
        nomeDosControles: string[]
    ): boolean {

        const obterConteudo = (controls: AbstractControl[]): string[] => controls.map(x => x.value),
            controles = () => nomeDosControles.map(x => formulario.get(x)),
            // se pelo menos um campo for preenchido essa função retorna true
            foiPreenchido = () => obterConteudo(controles()).some(x => !!x);

        return foiPreenchido();

    }

    /**
     * Notifica quando um formulário deve ser validado. se um dos controles
     * passados tiver conteúdo, notifico (true) que esse formulario deve ser validados.
     * @param formulario 
     * @param nomeDosControles: controles que devem ser monitorados quando o valor for
     * alterado.
     */
    public monitorarSeOFormularioDeveSerValidado(
        formulario: FormGroup,
        nomeDosControles: string[]
    ): Observable<boolean> {

        const obterConteudo = (controls: AbstractControl[]): string[] => controls.map(x => x.value),
            controles       = () => nomeDosControles.map(x => formulario.get(x)),
            // se pelo menos um campo for preenchido essa função retorna true
            foiPreenchido   = () => obterConteudo(controles()).some(x => !!x),
            ouveMudancas    = controles().map(x => x.valueChanges),
            eObrigatorio    = from(ouveMudancas).pipe(
                mergeMap(x => x),
                map(x => foiPreenchido()),);

        return eObrigatorio;

    }

    public osCamposForamPreenchidos(formulario: FormGroup, nomeDosControles: string[]): boolean {

        const obterConteudo = (controls: AbstractControl[]): string[] => controls.map(x => x.value),
              controles = () => nomeDosControles.map(x => formulario.get(x)),
              foiPreenchido = () => obterConteudo(controles()).some(x => !!x);
        
        return foiPreenchido();              

    }


    public monitorarSeOsControlesTemOMesmoValor(
        formulario: FormGroup,
        nomeDosControles: string[]
    ): Observable<boolean> {

        const obterConteudo = (controls: AbstractControl[]): string[] => controls.map(x => x.value),
            controles = () => nomeDosControles.map(x => formulario.get(x)),
            valorDoPrimeiroControle = () => obterConteudo(controles())[0],
            mesmoConteudo = () => every(obterConteudo(controles()), x => x === valorDoPrimeiroControle()),
            ouveMudancas = controles().map(x => x.valueChanges),
            temOMesmoConteudo = from(ouveMudancas).pipe(
                mergeMap(x => x),
                map(x => mesmoConteudo()),);

        return temOMesmoConteudo;

    }



    public removerTodosOsItensDoArray(formArray: FormArray): void {

        while (formArray.length != 0) {
            formArray.removeAt(0);
        }

    }

    public removerControles(formulario: FormGroup, ...nomeDosControles: string[]): void {
        
        nomeDosControles.forEach( nomeControle => {
            formulario.removeControl(nomeControle);
        });


    }


    public seInscreveNaMudancaDoIdDoControle(formulario: FormGroup, nomeDoControle: string, executarAtualizacaoBaseadoNo: (id: string) => void): void {

        formulario.get(nomeDoControle)
            .valueChanges
            .subscribe(id => {

                executarAtualizacaoBaseadoNo(id);

            });

    }


    public aplicarErro(controle: AbstractControl, mensagem: string): void {
        
        controle.setErrors({ invalid: { someProp: mensagem }});

    }

}   