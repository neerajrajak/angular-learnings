import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  defaultOption = 'teacher';
  answer = '';
  genders = ['Male','Female'];
  submitted = false;
  user = {
    userName : '',
    email : '',
    secretQuestion : '',
    answer : '',
    gender : ''
  }
  @ViewChild('f', {static : false}) signUpForm : NgForm; 

  suggestUserName() {
    const suggestedName = 'Superuser';

    // wrong approach
    // this.signUpForm.setValue(
    //   {
    //     userData : {
    //       username : suggestedName,
    //       email : ''
    //     },
    //     secret : 'pet',
    //     questionAnswer : '',
    //     gender : 'Male'
    //   }
    // )

    this.signUpForm.form.patchValue({
      userData : {
        username : suggestedName
      }
    });
  }

  // onSubmit(form : NgForm){
  //   console.log('Form : ', form);
  // }

  onSubmit(){
    console.log('Same using View Child : ',this.signUpForm);
    this.submitted = true;
    this.user.userName = this.signUpForm.value.userData.username;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionAnswer;
    this.user.gender = this.signUpForm.value.gender;

    console.log('User : ',this.user);

    this.signUpForm.reset();
  }

}
