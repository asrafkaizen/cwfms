import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeaService, Idea } from 'src/app/services/idea.service';
import { UserService } from '../../user.service';
import { ToastController } from '@ionic/angular';
import { Http } from '@angular/http';
import {Geolocation} from '@ionic-native/geolocation/ngx';

 
@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.page.html',
  styleUrls: ['./idea-details.page.scss'],
})
export class IdeaDetailsPage implements OnInit {

  imageURL: string
  busy: boolean = false  
  lat:any=''
  lng:any=''
  latitude:any=''
  longitude:any=''
  author:string=''
  owner: boolean = false
  admin: boolean = false
  stat: string
 
  idea: Idea = {
    name: '',
    type: '',
    img: '',
    lat: '',
    lng: '',
    author: '',
    stat: '',
  };

  @ViewChild('filebutton', {static:false}) filebutton
 
  constructor(private activatedRoute: ActivatedRoute, private ideaService: IdeaService,
    private toastCtrl: ToastController, private router: Router,
    public http: Http,
    private geolocation: Geolocation,
    public user: UserService
    ) { }
 
  ngOnInit() { 
    
  }
 
  ionViewWillEnter() {
    // const authed: Promise<boolean> = this.user.isAuthenticated();
    // alert(authed)
    // if ( authed ){
      this.author = this.user.getUsername();
    //   alert ("user defined");
    // }else{
    //   alert ("user undefined");
    // }
    
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ideaService.getIdea(id).subscribe(idea => {
        this.idea = idea;
      });
    }
  };

  ionViewDidEnter(){
    if ( this.author.includes("@mbmb.com")){
      this.admin = true;
      this.owner = true;
    }else if (this.author === this.idea.author){
      this.owner = true;
    }
    if (this.idea.lat){
      this.lat = this.idea.lat;
      this.lng = this.idea.lng;
    }
  }
 
  addIdea() {
    this.idea.author = this.author
    this.idea.img = this.imageURL
    this.idea.lat = this.latitude
    this.idea.lng = this.longitude
    this.idea.stat = "in-progress";
    this.ideaService.addIdea(this.idea).then(() => {
      this.router.navigateByUrl('/idea');
      this.showToast('Issue reported');
      this.router.navigate(['./list']);
    }, err => {
      this.showToast('There was a problem adding your idea :(');
    });
  };
 
  deleteIdea() {
    this.ideaService.deleteIdea(this.idea.id).then(() => {
      this.router.navigateByUrl('/idea');
      this.showToast('Issue deleted');
      this.router.navigate(['./list']);
    }, err => {
      this.showToast('There was a problem deleting your idea :(');
    });
  };
 
  updateIdea() {
    if (this.longitude != ""){
      this.idea.lat = this.latitude
      this.idea.lng = this.longitude
    }; 
    this.ideaService.updateIdea(this.idea).then(() => {
      this.showToast('Issue updated');
      this.router.navigate(['./list']);
    }, err => {
      this.showToast('There was a problem updating your idea :(');
    });
  };
 
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  };
  
  uploadFile(){
    this.filebutton.nativeElement.click()
  };

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
    })
    this.busy = false
  };

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
          };

};