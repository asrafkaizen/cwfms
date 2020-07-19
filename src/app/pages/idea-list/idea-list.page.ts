import { Component, OnInit } from '@angular/core';
import { IdeaService, Idea } from 'src/app/services/idea.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.page.html',
  styleUrls: ['./idea-list.page.scss'],
})
export class IdeaListPage implements OnInit {
 
  public ideas: Observable<Idea[]>;
 
  constructor(private ideaService: IdeaService,
    public afAuth: AngularFireAuth,
    public router: Router
    ) { }
 
  ngOnInit() {
    this.ideas = this.ideaService.getIdeas();
  };

  logout() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['login']);
    })
  };
}

