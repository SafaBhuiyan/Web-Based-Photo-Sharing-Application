import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Photo } from './Photo';
import { Comment } from './Comment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  idToken = localStorage.getItem('idToken');
  constructor(private http: HttpClient) { }

 
uploadPhoto(albumId: String, fileId: String){

  var photo: Photo = {
    'id': "",
    'albumId': albumId,
    'fileId': fileId,
    'thumbnailUrl': environment.API_BASE_URL + "files/show/" + fileId,
    'photoUrl': environment.API_BASE_URL + "files/show/" + fileId,
    'dateCreated': "",
    'createdBy': "",
  };

  
  var headers = this.getHeader();
    return this.http.post(environment.API_BASE_URL + "photos", photo, {headers});

}


saveComment(photoId: String, commentText: String){

  var comment: Comment = {
    'comment': commentText,
    'createdBy': "",
    'dateCreated': "",
    'id': "",
    'photoId': photoId,
  };

  
  var headers = this.getHeader();
    return this.http.post(environment.API_BASE_URL + "photos/comments", comment, {headers});

}




getPhoto(photoId:String){

  var headers = this.getHeader();
  return this.http.get(environment.API_BASE_URL + "photos/"+photoId, {headers});
  
}

getAllComments(photoId:String){

  var headers = this.getHeader();
  return this.http.get(environment.API_BASE_URL + "photos/"+photoId +"/comments", {headers});
  
}


    getHeader(){
      var headers = {
        'idToken': this.idToken
         };
  
         return headers;
  
    }

}
