import {AbstractControlOptions, FormGroup, ValidatorFn, Validators} from '@angular/forms';

export function conditionallyRequiredValidator(
    masterControlLabel: string,
    operator: string,
    conditionalValue: any,
    slaveControlLabel: string
): ValidatorFn | ValidatorFn[] | AbstractControlOptions {
    return (group: FormGroup): ValidatorFn | ValidatorFn[] | AbstractControlOptions => {
        const masterControl = group.controls[masterControlLabel];
        const slaveControl = group.controls[slaveControlLabel];
        // tslint:disable-next-line:no-eval
        if (eval(`'${masterControl.value}'
        ${operator}
        '${conditionalValue}'`)) {
            return Validators.required(slaveControl);
        }
        slaveControl.setErrors(null);
        return null;
    };
}
