import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { ChecklistService } from './checklist.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'src/mock/in-memory-data.service';
import { FakeDb } from 'src/mock/fake-db';
import { Checklist } from './checklist.model';


describe('ChecklistService', () => {

  // const failure = (err: any) => {
  //   fail(JSON.stringify(err));
  // }

  let
    checklistService: ChecklistService,
    httpTestingController: HttpTestingController;



  beforeEach(() => {

    TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule
        //,HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
      ],

      providers: [
        ChecklistService
      ]

    });

    checklistService = TestBed.get(ChecklistService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

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

  afterEach(() => {

    httpTestingController.verify();

  })


});
