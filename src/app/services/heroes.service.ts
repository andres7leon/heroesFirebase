import { Injectable } from '@angular/core';
import { Heroe } from '../components/interfaces/heroe.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  fireURL:string = 'https://heroes-24070.firebaseio.com/.json';
  heroeURL:string = 'https://heroes-24070.firebaseio.com/';

  constructor(private http: HttpClient) {
  }

  nuevoHeroe(heroe: Heroe){
  
    const body = JSON.stringify( heroe );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.fireURL, body, {headers: headers})
    .pipe(map( res => { return res }))
  }

  actualizarHeroe(heroe: Heroe, key$: string){
  
    const body = JSON.stringify( heroe );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const urlOne = `${ this.heroeURL}/${ key$}.json`;

    return this.http.put(urlOne, body, {headers: headers})
    .pipe(map( res => { return res }))
  }

  getHeroe( key$: string ){
    
    let url = `${ this.heroeURL }/${ key$ }.json`;

    return this.http.get( url )
    .pipe(map( res => { return res }));

  }

  getHeroes(){
    return this.http.get( this.fireURL )
    .pipe(map( res => { return res }));

  }

  borrarHeroe( key: string){
    let url = `${this.heroeURL}/${ key }.json`;
    return this.http.delete( url ).pipe(map( res => res ));
  }
}
