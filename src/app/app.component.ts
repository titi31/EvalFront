import { Component } from '@angular/core';
import { HotelsService } from './services/hotels.service';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EvalFront';
  cities;
  currentCities;
  constructor(public catService:HotelsService,
              public authService:AuthenticationService,
                private  router:Router){}
   ngOnInit(): void {
       this.getCities();
        this.authService.loadUser();

}
     private getCities() {
       this.catService.getResource(this.catService.host+"/cities")
         .subscribe(data=>{
           this.cities=data;
         },err=>{
           console.log(err);
         })
     }

     getHotelsByCities(c) {
       this.currentCities=c;
       this.router.navigateByUrl('/hotels/2/'+c.id);
     }
      onSelectedHotels() {
         this.currentCities=undefined;
         this.router.navigateByUrl("/hotels/1/0");
       }
        onLogin() {
           this.router.navigateByUrl('/login');
         }

         onLogout() {
          // this.caddyService.emptyCaddy();
           this.authService.logout();
           this.router.navigateByUrl('/login');
         }







   // END //

}
