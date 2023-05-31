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
  isEditing: any;
  submitted: boolean | undefined;

  constructor (private HomeService: HomeService,
    private formBuilder: FormBuilder
    ){
      this.formGroupClient = formBuilder.group({
        id : [''],
        nome : [''],
        telefone : [''],
        email : [''],
        endereco : [''],
        pagamento : ['']
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
      if(this.isEditing)
      {
        this.HomeService.edit(this.formGroupClient.value).subscribe(
          {
            next: () => {
              this.loadHome();
              this.formGroupClient.reset
              this.isEditing = false;
            }
          }
        )
      }
      else{
        this.HomeService.save(this.formGroupClient.value).subscribe(
          {
            next: data => {
              this.home.push(data)
              this.formGroupClient.reset();
            }
          }
          );
      }
  
  
      
    }
  
    delete(home: Atributos){
      this.HomeService.delete(home).subscribe({
        next: () => this.loadHome()
      })
    }
  
    edit(home: Atributos){
      this.formGroupClient.setValue(home);
      this.isEditing = true;
    }

    clean(){
      this.formGroupClient.reset()
      this.isEditing = false;
      this.submitted = false;
    }

}
