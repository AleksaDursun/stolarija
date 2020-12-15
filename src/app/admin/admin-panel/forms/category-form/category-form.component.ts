import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../../shared/dataModels/category.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  @Input() category: Category = {
    icon: '',
    name: '',
    title: {
      sr: '',
      en: '',
      de: ''
    },
    description: {
      sr: '',
      en: '',
      de: ''
    },
    products: []
  };

  @Output() submitted = new EventEmitter();

  categoryForm = new FormGroup({
    icon: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    title: new FormGroup({
      sr: new FormControl(this.category.title.sr, [Validators.required]) ,
      en:  new FormControl(this.category.title.en, [Validators.required]) ,
      de:  new FormControl(this.category.title.de, [Validators.required]) ,
    }),
    description: new FormGroup({
      sr: new FormControl(this.category.description.sr, [Validators.required]) ,
      en:  new FormControl(this.category.description.en, [Validators.required]) ,
      de:  new FormControl(this.category.description.de, [Validators.required]) ,
    })
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const products = this.category.products;
      this.category = this.categoryForm.value;
      this.category.products = products;
      console.log(this.category);
      this.submitted.emit(this.category);
    }
  }
}
