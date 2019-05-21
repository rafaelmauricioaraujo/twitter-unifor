import { Injectable } from '@angular/core';
import { Usuario } from './Usuario';
import { USUARIOS } from './mock-usuarios';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  getUsers(): Observable<Usuario[]> {
    return of(USUARIOS);
  }
}
