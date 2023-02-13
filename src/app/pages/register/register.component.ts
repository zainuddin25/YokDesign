import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  eyeType: string = 'fa-eye'
  inputType: string = 'password'

  password: string = ''
  confirmPassword: string = ''

  statusUsername: boolean = false
  statusEmail: boolean = false
  statusPassword: boolean = false
  statusConfirmPassword: boolean = false

  constructor(private router: Router) {}

  handleEyeButton() {
    if (this.eyeType === 'fa-eye') {
      this.inputType = 'text'
      this.eyeType = 'fa-eye-slash';
    } else {
      this.inputType = 'password'
      this.eyeType = 'fa-eye'
    }
  }

  handleEyeButtonConfirm() {
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

    if (this.statusUsername === false) {
      Toast.fire({
        icon: 'error',
        title: 'Username must be letters!'
      })
    } else if (this.statusEmail === false) {
      Toast.fire({
        icon: 'error',
        title: 'Email format must be @gmail.com!'
      })
    } else if (this.statusPassword === false) {
      Toast.fire({
        icon: 'error',
        title: 'Password must be 8 characters!'
      })
    } else if (this.statusConfirmPassword === false) {
      Toast.fire({
        icon: 'error',
        title: 'Confirm password not match'
      })
    } else if (this.statusUsername === true && this.statusEmail === true && this.statusPassword === true && this.statusConfirmPassword === true) {
      Toast.fire({
        icon: 'success',
        title: 'Welcome'
      })
    }

  }

  handleInputUsername(event: any) {
    const regexUsername = /^[a-zA-Z\s]+$/
    const username = event.target.value

    if(username.match(regexUsername)) {
      this.statusUsername = true
    } else {
      this.statusUsername = false
    }
  }

  handleInputEmail(event: any) {
    const regexEmail = /^[\w.+-]+@gmail\.com$/
    const email = event.target.value

    if (email.match(regexEmail)) {
      this.statusEmail = true
    } else {
      this.statusEmail = false
    }
  }

  handleInputPassword(event: any) {
    const password = event.target.value
    this.password = password

    if (password > 7) {
      this.statusPassword = true
    } else {
      this.statusPassword = false
    }
  }

  handleInputConfirmPassword(event: any) {
    const confirmPassword = event.target.value

    if (confirmPassword.match(this.password)) {
      this.statusConfirmPassword = true
    } else {
      this.statusConfirmPassword = false
    }

  }

}
