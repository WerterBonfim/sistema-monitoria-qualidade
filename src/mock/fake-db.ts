import { Checklist } from 'src/app/checklist/checklist.model';

export const FakeDb: Checklist[] = [
    {
        "id": "8dc5bd01-8b46-490a-b5de-7263fc0e2e1e",
        "nome": "Padrão Default",
        "itens": [
            {
                "id": "c7fdf2c1-d5fe-4047-bf6e-3c3d3210c37d",
                "posicaoOrdenacao": 1,
                "descricao": "Fez uma saudação inicial ?",
                "descricaoAbreviada": "Saudação",
                "peso": 7,
                "eEliminatoria": false
            },
            {
                "id": "11d2e84f-364f-4fd1-a339-37f0717d2454",
                "posicaoOrdenacao": 2,
                "descricao": "Pediu para fulano confirmar CPF",
                "descricaoAbreviada": "Confirmção Indentidade",
                "peso": 10,
                "eEliminatoria": true
            },
            {
                "id": "c3295919-f201-44c4-8018-f848821e4847",
                "posicaoOrdenacao": 3,
                "descricao": "Informou movito contato",
                "descricaoAbreviada": "Motivo",
                "peso": 5,
                "eEliminatoria": true
            },
            {
                "id": "b67fa780-a1a0-4158-be89-d99996e1247e",
                "posicaoOrdenacao": 4,
                "descricao": "Fez acordo",
                "descricaoAbreviada": "Acordo",
                "peso": 5,
                "eEliminatoria": false
            }
        ]
    }
];

// TODO: Criar objeto que representa os dados o usuario logado.