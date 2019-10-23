import { Component, OnInit } from '@angular/core';
//import { CityComponent } from '../City/CityComponent'
import { HotelsService } from '../services/hotels.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Hotel} from '../model/hotel.model';
@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  id;
  currentRequest;
  hotels;
  title:string;
  currentHotel: any;
  currentTime;
  editPhoto: boolean;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  constructor(public catService:HotelsService,
                   private route:ActivatedRoute,private router:Router,
                   private authService:AuthenticationService) { }

  ngOnInit() {
  this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd ) {
          let url = val.url;
          let p1=this.route.snapshot.params.p1;
          if(p1==1){
           this.title="Sélection";
            this.currentRequest='/hotels/search/selectedHotels';
            this.getHotels(this.currentRequest);
          }else if (p1==2){
                     let idCat=this.route.snapshot.params.p2;
                    this.title="City hotels "+idCat;
                     this.currentRequest='/cities/'+idCat+'/hotel';
                     this.getHotels(this.currentRequest);
                   }
  }
  });
  }
  private getHotels(url) {
      this.catService.getResource(this.catService.host+url)
        .subscribe(data=>{
          this.hotels=data;
        },err=>{
          console.log(err);
        })
    }
    private refreshUpdatedProduct() {
      this.catService.getResource(this.currentHotel._links.self.href)
        .subscribe(data=>{
          console.log(data);
         this.currentHotel.photoName=data['photoName'];
        },err=>{
          console.log(err);
        })
    }
    onEditPhoto(p) {
        this.currentHotel=p;
        this.editPhoto=true;
      }

      onSelectedFile(event) {
        this.selectedFiles=event.target.files;
      }

      uploadPhoto() {
        this.progress = 0;
        this.currentFileUpload = this.selectedFiles.item(0)
        this.catService.uploadPhotoHotel(this.currentFileUpload, this.currentHotel.id).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            //console.log(this.router.url);
            //this.getProducts(this.currentRequest);
            //this.refreshUpdatedProduct();
            this.currentTime=Date.now();
          }
        },err=>{
          alert("Problème de chargement");
        })



        this.selectedFiles = undefined
      }

     onHotelDetails(p) {
              this.router.navigateByUrl("/hotel/"+p.id);
            }
      getTS() {
         return this.currentTime;
       }

}
