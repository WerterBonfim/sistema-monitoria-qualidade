import { FakeDb } from './fake-db';
import { InMemoryDbService } from "angular-in-memory-web-api";


export class InMemoryDataService implements InMemoryDbService {
    

    constructor() {
        
        console.log("fake db iniciado com sucesso");

    }



    createDb(reqInfo?: import("angular-in-memory-web-api").RequestInfo): {} | import("rxjs").Observable<{}> | Promise<{}> {

        const db = [
            {
                "checklist": FakeDb
            }
        ];

        return db;

    }

}