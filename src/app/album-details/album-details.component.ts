import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Photo } from '../Photo';
import { UserService } from '../user.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {


  albumId: string;
  photos: Photo[];
  variableOne: String = "data" ;
 
  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.albumId = params.get('id');
      this.loadPhotoForAlbum(this.albumId);
    });
  }


  loadPhotoForAlbum(albumId: string){

    this.albumService.getPhotosForAlbum(albumId)
    .subscribe(
                  response => this.photos = <[]> response,
                  err => console.error('Albums-Photos got an error: ' + err),
                () => console.log('Albums-Photos got a complete notification')
    );
     
  }

  makeProfilePhoto(photoUrl: string){
    alert(this.variableOne);
    console.log("Get Profile Photo to Change", photoUrl);

    this.userService.makeProfilePhoto(photoUrl)
    .subscribe(
                  response => console.log("Profile photo updated"),
                  err => console.error('Albums-Photos got an error: ' + err),
                () => console.log('Albums-Photos got a complete notification')
    );
     
  }


  makeAlbumCover(photoUrl: string){
   
    this.albumService.makeAlbumCover(photoUrl, this.albumId)
    .subscribe(
                  response => console.log("Album cover updated"),
                  err => console.error('Album cover updated got an error: ' + err),
                () => console.log('Album cover updated got a complete notification')
    );
     
  }

}
