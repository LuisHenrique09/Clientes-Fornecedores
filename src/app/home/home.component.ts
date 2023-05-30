import { FormBuilder, FormGroup } from '@angular/forms';
import { Atributos } from '../Clientes';
import { HomeService } from './../home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  home: Atributos[] = [];

  formGroupClient : FormGroup;

  constructor (private HomeService: HomeService,
    private formBuilder: FormBuilder
    ){
      this.formGroupClient = formBuilder.group({
        id : [''],
        nome : [''],
        telefone : [''],
        email : [''],
        endereco : ['']
      });

    }


  ngOnInit(): void {
    this.loadHome();
  }

  loadHome() {
    this.HomeService.getHome().subscribe(
    {
      next : data => this.home = data
    }
  );
  }

  save() {
    this.HomeService.save(this.formGroupClient.value).subscribe(
      {
        next: data => {
          this.home.push(data);
          this.formGroupClient.reset();
        }
      }
    );
  }

}
