import { Injectable } from '@angular/core';

import { isString, isObject, isEmpty, isArray } from 'lodash';

@Injectable()
export class Util {


    //#region [ metodos estáticos ]

    public static patternsRegex = {

        email: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

    }

    public static algumObjetosEstaSemConteudo(...objetos: any[]): boolean {

        return objetos.some(x => Util.objetoSemConteudo(x));

    }

    public static algumItemDoArrayEstaSemConteudo(itens: any[]): boolean {

        return itens.some(x => Util.objetoSemConteudo(x));

    }

    public static objetoSemConteudo(obj: Array<any> | any): boolean {

        if (obj === 0) {
            return false;
        }

        if (!obj || obj === 'null') {
            return true;
        }

        if (isArray(obj) && (<Array<any>>obj).length === 0) {
            return true;
        }

        if (isObject(obj) && isEmpty(obj))
            return true;

        return false;
    }

    public static tryParseInt(valor: string): number | null {

        const resultado = parseInt(valor);
        const naoConverteu = isNaN(resultado);
        if (naoConverteu) {
            return null;
        }

        return resultado;

    }

    public static tryParseFloat(valor: string): number | null {

        if (this.objetoSemConteudo(valor)) {
            return null;
        }

        if (isString(valor))
            valor = valor.replace(',', '.');

        const resultado = parseFloat(valor);
        const naoConverteu = isNaN(resultado);
        if (naoConverteu) {
            return null;
        }

        return resultado;

    }

    public static retonaNullSeNaoTemConteudo(valor: any): any {

        if (Util.objetoSemConteudo(valor)) {
            return null;
        }

        return valor;

    }

    public static retonarStringVaziaSeNaoTemConteudo(valor: any): any {

        if (Util.objetoSemConteudo(valor)) {
            return "";
        }

        return valor;

    }

   

    public static converterObjetoParaBase64(obj: any): string {

        const jsonEscapado = encodeURIComponent(JSON.stringify(obj))
        const criptografado = btoa(jsonEscapado);
        return criptografado;

    }

    public static converterBase64ParaObjeto(encriptado: string): any {

        const json = decodeURIComponent(atob(encriptado));
        const obj = JSON.parse(json);
        return obj;
    }


    //#endregion
    

    constructor(        
    ) {

    }


    /**
     * Remove os objetos duplicados baseando em uma propriedade chave
     * @param arr Array de objetos
     * @param key chave que a função deve se basear para remover os itens duplicados
     * @example Ex: 
     *  const meuArray = [ { id:"1" }, { id:"1" }, { id:"2" }, ]
     *  removeDuplicates(meuArray, "id") // [ { id:"1" }, { id:"2" } ]     
     */
    public removeDuplicados(arr, key): Array<any> {

        if (!(arr instanceof Array) || key && typeof key !== 'string') {
            return [];
        }

        if (key && typeof key === 'string') {
            return arr.filter((obj, index, arr) => {
                return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === index;
            });

        } else {
            return arr.filter(function (item, index, arr) {
                return arr.indexOf(item) == index;
            });
        }
    }


    public objetoSemConteudo(obj: Array<any> | any): boolean {

        return Util.objetoSemConteudo(obj);

    }

    public objetosSemConteudo(...itens: any[]) {

        return Util.algumObjetosEstaSemConteudo(itens);

    }

    public static isRepeatingChars = (str) =>
        str.split('').every((elem) => elem === str[0]);

    
    public static newGuid(): string {

        const gerar4Chars = () => Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);

        return gerar4Chars() +
            gerar4Chars() + '-' +
            gerar4Chars() + '-' +
            gerar4Chars() + '-' +
            gerar4Chars() + '-' +
            gerar4Chars() +
            gerar4Chars() +
            gerar4Chars();

    }





}

