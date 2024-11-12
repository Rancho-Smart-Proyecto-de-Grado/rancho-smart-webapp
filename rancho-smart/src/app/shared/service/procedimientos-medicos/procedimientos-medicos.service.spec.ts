import { TestBed } from '@angular/core/testing';

import { ProcedimientosMedicosService } from './procedimientos-medicos.service';

describe('ProcedimientosMedicosService', () => {
  let service: ProcedimientosMedicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcedimientosMedicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
