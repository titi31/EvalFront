import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  private cities:any[]
  currentCitie;
  constructor(private httpClient: HttpClient, private  router:Router) { }

  ngOnInit() {
   /* this.httpClient.get('http://localhost:8080/cities').subscribe((response) => {
      this.cities=response._embedded.cities;
    })*/

  }
  getHotelByCities(c) {
     /* this.currentCitie=c;
      this.httpClient.get('http://localhost:8080/cities/'+c.id).subscribe((response) => {
        console.log(response._embedded.hotel);
        return response._embedded.hotel
      });*/
    }

}
