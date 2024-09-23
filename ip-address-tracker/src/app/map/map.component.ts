import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { LeafletModule } from "@bluehalo/ngx-leaflet";
import { tileLayer, latLng, MapOptions, Layer, marker, circle } from "leaflet";

@Component({
  selector: "app-map",
  standalone: true,
  imports: [LeafletModule],
  template: `
    <div
      style="height: 100%"
      leaflet
      [leafletLayers]="layers()"
      [leafletOptions]="options()"
    ></div>
  `,
  styleUrl: "./map.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  coordinates = input.required<{ lat: number; lng: number }>();

  options = computed<MapOptions>(() => {
    return {
      layers: [
        tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`,
        }),
      ],
      zoom: 10,
      zoomControl: true,
      center: latLng(this.coordinates().lat, this.coordinates().lng),
    };
  });

  layers = computed<Layer[]>(() => {
    return [marker([this.coordinates().lat, this.coordinates().lng])];
  });
}
