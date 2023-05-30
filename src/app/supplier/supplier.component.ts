import { FormGroup, FormBuilder } from '@angular/forms';
import { Atributos2 } from '../Fornecedores';
import { SupplierService } from './../supplier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  supplier: Atributos2[] = [];

  formGroupClient : FormGroup;

  constructor (private SupplierService: SupplierService,
    private FormBuilder: FormBuilder
    ){
      this.formGroupClient = FormBuilder.group({
        id : [''],
        nome : [''],
        produto : [''],
        valor : ['']
      });
    }

  ngOnInit(): void {
    this.loadSupplier();
  }

  loadSupplier() {
    this.SupplierService.getSupplier().subscribe(
    {
      next : data => this.supplier = data
    }
    );
  }

  save() {
    this.SupplierService.save(this.formGroupClient.value).subscribe(
      {
        next: data => {
          this.supplier.push(data);
          this.formGroupClient.reset();
        }
      }
    );
  }

}
