import { JsonPipe, NgFor } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from "@angular/core";
import { LeafletModule } from "@bluehalo/ngx-leaflet";
import {
  tileLayer,
  latLng,
  MapOptions,
  Layer,
  marker,
  icon,
  Icon,
  circle,
  LatLngExpression,
  Map,
} from "leaflet";

@Component({
  selector: "app-map",
  standalone: true,
  imports: [LeafletModule, JsonPipe],
  template: `
    <div
      leaflet
      (leafletMapReady)="map.set($event)"
      [leafletLayers]="layers()"
      [leafletOptions]="options()"
    ></div>
  `,
  styleUrl: "./map.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  coordinates = input.required<{ lat: number; lng: number }>();
  map = signal<Map | null>(null);

  options = computed<MapOptions>(() => {
    return {
      layers: [
        tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`,
        }),
      ],
      zoom: 14,
      zoomControl: true,
      center: latLng(this.coordinates().lat, this.coordinates().lng),
    };
  });

  layers = computed<Layer[]>(() => {
    const coordinates: LatLngExpression = [
      this.coordinates().lat,
      this.coordinates().lng,
    ];

    return [
      marker(coordinates, {
        icon: icon({
          ...Icon.Default.prototype.options,
          iconUrl: "assets/marker-icon.png",
          iconRetinaUrl: "assets/marker-icon-2x.png",
          shadowUrl: "assets/marker-shadow.png",
        }),
      }),
      circle(coordinates, { radius: 1000 }),
    ];
  });

  constructor() {
    effect(() => {
      this.map()?.flyTo(this.coordinates());
    });
  }
}
