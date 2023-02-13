import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  eyeType: string = 'fa-eye'
  inputType: string = 'password'
  emailStatus: boolean = false
  passwordStatus: boolean = false
  

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token')
    if (token === null) {
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/home'])
    }
  }

  handleEyeButton() {
    if (this.eyeType === 'fa-eye') {
      this.inputType = 'text'
      this.eyeType = 'fa-eye-slash';
    } else {
      this.inputType = 'password'
      this.eyeType = 'fa-eye'
    }
  }

  loginButton() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    if (this.emailStatus === false) {
      Toast.fire({
        icon: 'error',
        title: 'Email format must be @gmail.com!'
      })
    } else if (this.passwordStatus === false) {
      Toast.fire({
        icon: 'error',
        title: 'Password must be 8 characters!'
      })
    } else if(this.emailStatus === true && this.passwordStatus === true) {
      Toast.fire({
        icon: 'success',
        title: 'Welcome Username'
      })
    }

    
  }

  changeInputEmail(event: any) {
    const regexEmail = /^[\w.+-]+@gmail\.com$/
    const email = event.target.value

    if (email.match(regexEmail)) {
      this.emailStatus = true
    } else {
      this.emailStatus = false
    }
  }

  changeInputPassword(event: any) {
    const password = event.target.value.length

    if (password > 7) {
      this.passwordStatus = true
    } else {
      this.passwordStatus = false
    }
  }

}
