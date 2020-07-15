import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
 
export interface Post {
  id?: string,
  latitude:any,
  longitude:any,
  desc: string,
  type: string
}
 
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Observable<Post[]>;
  private postCollection: AngularFirestoreCollection<Post>;
 
  constructor(private afs: AngularFirestore) {
    this.postCollection = this.afs.collection<Post>('posts');
    this.posts = this.postCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getPosts(): Observable<Post[]> {
    return this.posts;
  }
 
  getPost(id: string): Observable<Post> {
    return this.postCollection.doc<Post>(id).valueChanges().pipe(
      take(1),
      map(post => {
        post.id = id;
        return post
      })
    );
  }
 
  // addIdea(post: Idea): Promise<DocumentReference> {
  //   return this.postCollection.add(post);
  // }
 
  // updateIdea(post: Idea): Promise<void> {
  //   return this.postCollection.doc(post.id).update({ name: idea.name, notes: idea.notes });
  // }
 
  // deleteIdea(id: string): Promise<void> {
  //   return this.ideaCollection.doc(id).delete();
  // }
}