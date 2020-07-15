import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService, Post } from 'src/app/services/post.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
	selector: 'app-post',
	templateUrl: './post.page.html',
	styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

	postID: string
	desc:string

  	post: Post = {
		latitude:'',
		longitude:'',
		desc:'',
		type:''
	  }
  
	constructor(private route: ActivatedRoute, private postService: PostService) {
		

	}

	ngOnInit() {
		this.postID = this.route.snapshot.paramMap.get('id')
		if (this.postID) {
			this.postService.getPost(this.postID).subscribe(post => {
			  this.post = post;
			  this.desc = post.desc;
			});
		  }
		// this.post = this.afs.doc(`posts/${this.postID}`).valueChanges()
	}

	ionViewWillEnter() {
		this.postID = this.route.snapshot.paramMap.get('id')
		if (this.postID) {
			this.postService.getPost(this.postID).subscribe(post => {
			  this.post = post;
			  this.desc = post.desc;
			});
		  }
	  }

}