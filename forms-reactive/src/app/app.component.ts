import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenUserNames = ['Harry', 'Sejal'];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        'userData': new FormGroup({
          'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
          'email': new FormControl(null, [Validators.required, Validators.email],this.forbiddenEmails),
        }),
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      }
    );

    //Value Changes  
    this.signupForm.valueChanges.subscribe(
      value => console.log('Value changing : ',value)
    )

    //Status Changes
    this.signupForm.statusChanges.subscribe(
      status => console.log('Value changing : ',status)
    )

    //setvalue
    this.signupForm.setValue({
      'userData' : {
        'username' : 'Max',
        'email' : 'max@udemy.com'
      },
      'gender' : 'male',
      'hobbies' : []
    })

    //patch value
    this.signupForm.patchValue({
      'userData' : {
        'username' : 'Neeraj',
      }
    })
  }

  onSubmit() {
    console.log('Form Details.. : ', this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true }
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === "test@test.com") {
            resolve({ 'emailIsForbidden': true });
          }
          else {
            resolve(null);
          }
        }, 1500);
      }
    );
    return promise;
  }
}
