import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HotelsService } from '../services/hotels.service';
import {AuthenticationService} from '../services/authentication.service';
import {HttpEventType, HttpResponse} from '../../../node_modules/@angular/common/http';
import {Hotel} from '../model/hotel.model';
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  currentHotel;
  private mode: number=0;
  currentTime;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  private editPhoto: boolean;
  constructor(private router:Router, private route:ActivatedRoute,
               public authService:AuthenticationService,
                            public catalService:HotelsService,) { }

  ngOnInit() {
    let id=this.route.snapshot.params.id;
        this.catalService.getResource(this.catalService.host+"/hotels/"+id)
          .subscribe(data=>{
            this.currentHotel=data;
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
          this.catalService.uploadPhotoHotel(this.currentFileUpload, this.currentHotel.id).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              //console.log(this.router.url);
              //this.getProducts(this.currentRequest);
              //this.refreshUpdatedProduct();
              this.currentTime=Date.now();
              this.editPhoto=false;
            }
          },err=>{
            alert("Problème de chargement");
          })



          this.selectedFiles = undefined
        }
        onEditHotel() {
            this.mode=1;
          }

          onUpdateHotel(data) {
            let url=this.currentHotel._links.self.href;
            this.catalService.patchResource(url,data)
              .subscribe(d=>{
                this.currentHotel=d;
                this.mode=0;
              },err=>{
                console.log(err);
              })
          }

      onHotelDetails(p) {
          this.router.navigateByUrl("/hotels/"+p.id);
        }
         getTS() {
            return this.currentTime;
          }


}
