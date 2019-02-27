import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../interfaces/heroe.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {
  
  heroe:Heroe = {
    nombre:'',
    bio:'',
    casa:''
  };

  nuevo:boolean = false;
  id:string;

  constructor(private _heroesService:HeroesService, private router: Router, private routeUrl: ActivatedRoute) { 
    this.routeUrl.params.subscribe(paramatros => 
      {this.id = paramatros['id']
        if( this.id !== 'nuevo'){
          this._heroesService.getHeroe(this.id)
            .subscribe( (data: any) => {
              console.log("data",data);
              this.heroe = data;
            }
          )
        }
      }
    );
  }

  ngOnInit() {
  }

  guardar() {
    
    if( this.id == 'nuevo'){
      //insertar
      this._heroesService.nuevoHeroe(this.heroe).subscribe( data => {
        this.router.navigate(['/heroe', data['name'] ]);
      },error => console.log('error', error));
    }else{
      //actualizar
      this._heroesService.actualizarHeroe(this.heroe, this.id).subscribe( data => {
        console.log("data actualizar",data)
        this.router.navigate(['/nuevo']);
      },error => console.log('error', error));
    }
    
  }

  agregarNuevo( form: NgForm){
    this.router.navigate(['/heroe','nuevo']);
    form.reset({
      casa: 'Marvel'
    });
  }



}
