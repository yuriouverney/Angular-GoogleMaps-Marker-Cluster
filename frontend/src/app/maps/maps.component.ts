import { Component, OnInit } from '@angular/core';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
declare module 'supercluster';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  YOUR_API_KEY = 'YOUR_API_KEY'

  locations = [
    { lat: -33.56391, lng: 150.154312, numeroEquip: '12345' },
    { lat: -33.718234, lng: 150.363181,  numeroEquip: '12346'},
    { lat: -33.727111, lng: 150.371124,  numeroEquip: '12347'},
    { lat: -33.848588, lng: 151.209834,  numeroEquip: '12348'},
  ];

  ngOnInit(): void {
    (window as any).initMap = () => {
      this.initMap();
    };
    this.loadMapScript();
  }

  private loadMapScript(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.YOUR_API_KEY}&callback=initMap&v=weekly`;
    document.body.appendChild(script);
  }

  private initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 3,
        center: { lat: -28.024, lng: 140.887 },
      }
    );
  
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });
  
    const image = {
      url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(32, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32),
    };
  
    // Add some markers to the map.
    const markers = this.locations.map((equipamento, i) => {
      const position = equipamento;
      const title = equipamento.numeroEquip;
      const label = '';
      const options: google.maps.MarkerOptions|null = {
        position,
        label,
        title,
        clickable: true,
      }

      if (equipamento.numeroEquip === '12345') {
        options.icon = image
      }

      const marker = new google.maps.Marker(options);
  
      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        console.log('bateu aqui')
        infoWindow.setContent(label);
        infoWindow.open(map, marker);
      });
  
      return marker;
    });
  
    // Add a marker clusterer to manage the markers.
    new MarkerClusterer({ markers, map });
  }

}
