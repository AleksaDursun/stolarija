import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../services/api.service';

@Component({
    selector: 'app-footer-two',
    templateUrl: './footer-two.component.html',
    styleUrls: ['./footer-two.component.scss']
})
export class FooterTwoComponent implements OnInit {

    private LOCALS = {
        success: 'Hvala Vam na pretplati!',
        error: {
            invalid: 'Email nije validan.',
            exists: 'Ovaj email je već prijavljen.',
            generic: 'Desila se greška. Molimo pokušajte kasnije.'
        }
    };

    public newsLetterForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
    });
    public error: string;
    public success: string;

    constructor(private api: ApiService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        if (this.newsLetterForm.valid) {
            this.api.subscribeToNewsletter(this.newsLetterForm.value).subscribe(response => {
                this.error = '';
                this.success = this.LOCALS.success;
            }, error =>  {
                console.log();
                if (error.error.errors[0].includes('has already been taken')) {
                    this.error = this.LOCALS.error.exists;
                }
                this.error = this.LOCALS.error.generic;
                this.success = '';
            });
        } else {
            this.error = this.LOCALS.error.invalid;
        }
    }
}
