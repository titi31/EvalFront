
import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
providedIn: 'root'
})

/* import Class */
export class HotelsService {
public host:string="http://localhost:8080";

/* Constructor */
constructor(private http:HttpClient) {
  }

  public getResource(url){
      return this.http.get(url);
  }
  uploadPhotoHotel(file: File, idHotel): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idHotel, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public patchResource(url,data){
    return this.http.patch(url,data);
  }


}

// END //
