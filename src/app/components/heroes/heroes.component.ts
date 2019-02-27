import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  
  heroes:any[] = [];
  constructor(private _heroServices:HeroesService) {
    this._heroServices.getHeroes()
      .subscribe( (data:any) => {
        console.log("data",data);
        this.heroes = data;
        /*for( let key$ in data){
          this.heroes.push( data[key$] );
          console.log("key$",data[key$])
        }*/
      });
   }

  ngOnInit() {
  }

  borrarHeroe(key: string){
    console.log("key", key);
    this._heroServices.borrarHeroe(key)
      .subscribe(respuesta => {console.log("respuesta", respuesta)
        if( respuesta ){

        }else{
          delete this.heroes[key];
        }
    });
  }

}
