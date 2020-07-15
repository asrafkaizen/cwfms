import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { Router } from '@angular/router'
import {AlertController} from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = ""
  username: string = ""
  password: string = ""
  password2: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService
    ) { }

  ngOnInit() {
  }

  async register(){
    const { username, password, password2} = this
    if (password !== password2){
      this.showAlert("Error", "Passwords don't match")
        return console.error("Passwords don't match")
    }
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password)
      
      this.afstore.doc(`users/${res.user.uid}`).set({
        username
      })
      
      this.user.setUser({
        username,
        uid: res.user.uid
      })
      
      console.log(res)
      this.showAlert("Success", "Registration successful")
      this.router.navigate(['/login'])
    }catch (error){ 
      console.dir(error)
      this.showAlert("Error", error.message)
    }

    }

    async showAlert(header: string, message: string){
      const alert = await this.alert.create({
        header,
        message,
        buttons: ["ok"]
      })
      await alert.present()
  }

}
