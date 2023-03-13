import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task';

  regForm = new FormGroup({
    firstName : new FormControl(),
    lastName : new FormControl(),
    mobile : new FormControl(null,[Validators.required]),
    email : new FormControl(null,[Validators.required]),
    pwd : new FormControl()
  })

  loginForm = new FormGroup({
    mobile : new FormControl(),
    pwd : new FormControl()
  })

  register(){
    if(this.regForm['status'] === 'VALID')
    {
      let obj:any = {};
      //let arr:any = [];
      obj['firstName'] = this.regForm['controls']['firstName']['value'];
      obj['lastName'] = this.regForm['controls']['lastName']['value'];
      obj['mobile'] = this.regForm['controls']['mobile']['value'];
      obj['email'] = this.regForm['controls']['email']['value'];
      obj['pwd'] = this.regForm['controls']['pwd']['value'];
      let formData = localStorage.getItem('formData');
      if(formData){
        let s = JSON.parse(formData);
        let arr:any = [];
        let localData:any;
        if(!Array.isArray(s))
        {
          arr.push(s)
          localData = arr
        }
        else
        {
          localData = s
        } 
        localData.forEach((e:any) => {
          if(e.mobile == obj['mobile'] || e.email == obj['email']){
            alert("Email or Mobile should not be duplicate"); 
            return           
          }
          else{
            localData.push(obj)
            localStorage.setItem('formData',JSON.stringify(localData));
          }
        })
      } 
      else
        localStorage.setItem('formData',JSON.stringify(obj));       
      
    }
    else
    {
      alert('Please Enter Valid Mobile and Email')
    }
  }

  login(){
    let formData = localStorage.getItem('formData');
    if(formData){
      let data = JSON.parse(formData);
      let validUser = data.find((e:any) =>
        e.mobile == this.loginForm['value']['mobile'] && e.pwd == this.loginForm['value']['pwd']
      )
      if(validUser)
        alert('Welcome');
      else{
        alert('Invalid Credentials')        
      }
    }    
    else{
      alert('Please Register!')
    }
  }
}
