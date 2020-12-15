import {Component, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../shared/dataModels/product.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventEmitter} from '@angular/core';
import {Category} from '../../../../shared/dataModels/category.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() product: Product = {
    image: '',
    category_name: '',
    name: {
      sr: '',
      en: '',
      de: ''
    },
    description: {
      sr: '',
      en: '',
      de: ''
    }
  };
  @Input() categories: Category[];

  @Output() submitted = new EventEmitter();

  productForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    category_name: new FormControl(this.product.category_name, [Validators.required]),
    name: new FormGroup({
      sr: new FormControl(this.product.name.sr, [Validators.required]) ,
      en:  new FormControl(this.product.name.en, [Validators.required]) ,
      de:  new FormControl(this.product.name.de, [Validators.required]) ,
    }),
    description: new FormGroup({
      sr: new FormControl(this.product.description.sr, [Validators.required]) ,
      en:  new FormControl(this.product.description.en, [Validators.required]) ,
      de:  new FormControl(this.product.description.de, [Validators.required]) ,
    }),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.submitted.emit(this.productForm.value);
    }
  }

  setImageLink(e: string): void {
    this.productForm.get('image').setValue(e);
  }

}
