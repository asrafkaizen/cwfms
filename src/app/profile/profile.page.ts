import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  userPosts
  busy: boolean = true

  constructor(private afs: AngularFirestore, private user: UserService, private router: Router) { 
    this.busy = true
    const posts = afs.doc(`users/${user.getUID()}`)
    this.userPosts = posts.valueChanges()
    this.busy = false
  }

  goTo(postID: string){
    this.router.navigate(['/tabs/post/' + postID])
  }

  ngOnInit() {
  }

}
