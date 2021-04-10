import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photogallery',
  templateUrl: './photogallery.component.html',
  styleUrls: ['./photogallery.component.scss']
})
export class PhotogalleryComponent implements OnInit {
  @Input() gallery = [];
  selectedPhoto: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  showLargePhoto(i) {
    this.selectedPhoto = this.gallery[i].images.post_big.url;
  }
}
