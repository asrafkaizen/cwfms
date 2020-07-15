import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx'

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  lat:any=''
  lng:any=''
  latitude:any=''
  longitude:any=''
  imageURL: string
  desc: string
  type: string
  loc: string
  busy: boolean = false

  // locationWatchStarted:boolean;
  // locationSubscription:any;
  // locationTraces = [];

  @ViewChild('filebutton', {static:false}) filebutton

  constructor(
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService,
    private alertController: AlertController,
    private router: Router,
    private geolocation: Geolocation
    ) { }

  ngOnInit() {
  }

  async createPost(){
    this.busy = true

    const image = this.imageURL
    const type = this.type
    const desc = this.desc
    const latitude = this.latitude
    const longitude = this.longitude
    const author = this.user.getUsername();
    
    this.afstore.doc(`users/${this.user.getUID()}`).set({
      posts:  firestore.FieldValue.arrayUnion({
           image
      })
    }, { merge: true });

    this.afstore.doc(`posts/${image}`).set({
      posts:  firestore.FieldValue.arrayUnion({
           author,
           type,
           desc,
           latitude,
           longitude
      })
    }, { merge: true });


    this.busy = false
    this.imageURL = ""
    this.desc = ""   

    const alert = await this.alertController.create({
      header: 'Done',
      message: 'Your post was created!',
      buttons: ['Cool!']
    })

    await alert.present()

    this.router.navigate(['/tabs/profile'])
  }

  getLoc(){
  this.geolocation.getCurrentPosition(
    {maximumAge: 1000, timeout: 5000,
     enableHighAccuracy: true }
    ).then((resp) => {
          // resp.coords.latitude
          // resp.coords.longitude
          //alert("r succ"+resp.coords.latitude)
          //alert(JSON.stringify( resp.coords));
    
          this.lat=resp.coords.latitude
          this.lng=resp.coords.longitude
          },er=>{
            alert('Can not retrieve Location')
          }).catch((error) => {
          alert('Error getting location - '+JSON.stringify(error))
          });
        }

  // getCoordinates(){
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     this.locationTraces.push({
  //       latitude:resp.coords.latitude,
  //       longitude:resp.coords.latitude,
  //       accuracy:resp.coords.accuracy,
  //       timestamp:resp.timestamp
  //     });

  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });

  //   this.locationSubscription = this.geolocation.watchPosition();
  //   this.locationSubscription.subscribe((resp) => {

  //     this.locationWatchStarted = true;
  //     this.locationTraces.push({
  //       latitude:resp.coords.latitude,
  //       longitude:resp.coords.latitude,
  //       accuracy:resp.coords.accuracy,
  //       timestamp:resp.timestamp
  //     });
  //   });
  // }

  uploadFile(){
    this.filebutton.nativeElement.click()
  }

  fileChanged(event){
    this.busy = true

    const files = event.target.files
    
    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', '51235c1534321a34dd83')

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event=> { 
      console.log(event)
      this.imageURL = event.json().file
      this.busy = false
    })
  }

}
