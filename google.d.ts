declare namespace google {
    export namespace maps {
      export class Map {
        constructor(mapDiv: HTMLElement, opts?: MapOptions);
        setCenter(latlng: LatLng | LatLngLiteral): void;
      }
  
      export interface MapOptions {
        zoom?: number;
        center?: LatLng | LatLngLiteral;
      }
  
      export class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }
  
      export interface LatLngLiteral {
        lat: number;
        lng: number;
      }
  
      export class Marker {
        constructor(opts?: MarkerOptions);
        setPosition(latlng: LatLng | LatLngLiteral): void;
        setMap(map: Map | null): void;
      }
  
      export interface MarkerOptions {
        position?: LatLng | LatLngLiteral;
        map?: Map;
        title?: string;
        label?: string;
        icon?: string;
      }
  
      export class Polyline {
        constructor(opts?: PolylineOptions);
      }
  
      export interface PolylineOptions {
        path?: LatLng[] | LatLngLiteral[];
        geodesic?: boolean;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
        map?: Map;
      }
  
      export namespace geometry {
        export namespace encoding {
          export function decodePath(encodedPath: string): LatLng[];
        }
      }
    }
  }