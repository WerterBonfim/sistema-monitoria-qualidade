import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { ChecklistService } from './checklist.service';
import { FakeDb } from 'src/mock/fake-db';
import { Checklist } from './checklist.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ChecklistItem } from './checklist-item/checklist-item.model';


describe('ChecklistService', () => {

  // const failure = (err: any) => {
  //   fail(JSON.stringify(err));
  // }

  let
    checklistService: ChecklistService,
    httpTestingController: HttpTestingController;



  beforeEach( async(() => {

    TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule
      ],

      providers: [
        ChecklistService
      ]

    });

    checklistService = TestBed.get(ChecklistService);
    httpTestingController = TestBed.get(HttpTestingController);

  }));


  afterEach(() => {

    httpTestingController.verify();

  })

  it('Deve ser criado', () => {

    expect(checklistService).toBeTruthy();

  });


  it('deve retornar uma lista de checklist', () => {


    checklistService.listarChecklists()
      .subscribe(checklists => {

        expect(checklists).toBeTruthy('nenhum check list foi retornado');
        expect(checklists.length).toBeGreaterThan(0, 'Deve conter mais de 0 checklist');
        const checklist = checklists.find(x => x.id === "8dc5bd01-8b46-490a-b5de-7263fc0e2e1e")
        expect(checklist.nome).toBe("Padrão Default", 'Não retonou o primeiro registro');

      });

    const req = httpTestingController.expectOne('api/checklist');
    expect(req.request.method).toEqual('GET');
    req.flush(FakeDb);

  });

  it('deve retornar um checklist por id', () => {

    const id = "8dc5bd01-8b46-490a-b5de-7263fc0e2e1e";

    checklistService.buscarChecklist(id)
      .subscribe(checklist => {

        expect(checklist).toBeTruthy('check list não foi encontrado');
        expect(checklist.nome).toBe("Padrão Default", 'Não retonou o primeiro registro');

      });

    const req = httpTestingController.expectOne(`api/checklist?id=${id}`);
    expect(req.request.method).toEqual('GET');
    const check = FakeDb.find(x => x.id === id);
    req.flush(check);

  });

  it('deve atualizar um checklist por id', () => {

    const atualizacao: Partial<Checklist> = { nome: "Checklist atualizado 2019" };
    const id = "8dc5bd01-8b46-490a-b5de-7263fc0e2e1e";


    checklistService.atualizar(id, atualizacao)
      .subscribe(checklist => {

        expect(checklist).toBeTruthy('check list não foi encontrado');
        expect(checklist.nome).toBe("Checklist atualizado 2019", 'Não retonou o primeiro registro');

      });

    const req = httpTestingController.expectOne(`api/checklist/${id}`);
    expect(req.request.method).toEqual('PUT');
    const check = FakeDb.find(x => x.id === id);

    req.flush({
      ...check,
      ...atualizacao
    });

  });

  it('Deve dar um erro caso ocorrer uma falha ao salvar um checklist', () => {

    const atualizacao: Partial<Checklist> = { nome: "Checklist atualizado 2019" };
    const id = "8dc5bd01-8b46-490a-b5de-7263fc0e2e1e";

    checklistService.atualizar(id, atualizacao)
      .subscribe(
        () => fail("A operação de atualizar um checklist deveria ter falhado"),

        (error: HttpErrorResponse) => {

          expect(error.status).toBe(500 /**	Server Errors */);
          // asserts para retonar um estrutura especifica

        }
      );

    const req = httpTestingController.expectOne(`api/checklist/${id}`);
    expect(req.request.method).toEqual("PUT");

    const mensgemDeErro = 'Ocorreu um erro interno no servidor ao tentar atualizar o checklist, tente novamente em breve';
    const response = { sucesso: false, mensagem: mensgemDeErro };
    req.flush(response, { status: 500, statusText: 'Internal Server Error' });

  });

  it('Deve atualizar uma pergunta de um checklist', () => {

    const
      checklist = FakeDb[0],
      segundaPergunta = checklist.itens[2];

    const atualizacao: Partial<ChecklistItem> = { descricaoAbreviada: "atualizado pelo werter" };

    checklistService.atualizarPergunta(segundaPergunta.id, atualizacao)
      .subscribe(checklistItem => {

        expect(checklistItem).toBeTruthy('pergunta do checklist não foi atualizado');
        expect(checklistItem.descricaoAbreviada).toBe("atualizado pelo werter", 'Não retonou o primeiro registro');

      });

    const req = httpTestingController.expectOne(`api/checklist-item/${segundaPergunta.id}`);
    expect(req.request.method).toEqual('PUT');

    req.flush({
      ...segundaPergunta,
      ...atualizacao
    });


  });


});
