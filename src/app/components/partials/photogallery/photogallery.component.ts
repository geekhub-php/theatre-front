import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photogallery',
  templateUrl: './photogallery.component.html',
  styleUrls: ['./photogallery.component.scss']
})
export class PhotogalleryComponent implements OnInit {
  @Input() gallery = [];

  constructor() {
  }

  ngOnInit(): void {
  }
}
