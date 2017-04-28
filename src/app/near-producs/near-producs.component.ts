import { Component, OnInit, ViewEncapsulation } from "@angular/core";


@Component({
  selector: 'near-products',
  templateUrl: './near-producs.component.html',
  styleUrls: ['./near-producs.component.css']
})
export class NearProductsComponent implements OnInit {
  lat: number =  4.7524465035945 ;
  lng: number = -74.08623508554138;
  constructor() { }

  ngOnInit() {
  }

}
