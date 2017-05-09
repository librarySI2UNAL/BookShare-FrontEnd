import { Component } from '@angular/core';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['map.component.css']
})
export class MapComponent{
    latitude: number = 41.8708;
    logitude: number = -87.6505;
    coords: number[] = [this.latitude, this.longitude];
    zoom: number = 12;
    scrollmap: boolean = false;
}