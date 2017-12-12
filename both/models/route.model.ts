import { CollectionObject } from './collection-object.model';

export interface Route extends CollectionObject {
  title: string;
  body: string;
  short_description: string;
  duration: string;
  distance: number;
  published: boolean;
  travel_date: string;
  sorting_date: Date;
  idea_credit_to: string;
  access_by_train: boolean;
  images: routeImages[];
  main_image_id: string;
  main_icon: string;
  atractions: atraction[];
  url: string;
  coordinates: string;
  zoom: string;
  center_lat: number;
  center_lng: number;
}

interface atraction {
  description: string;
  name: string;
  icon: string;
  lat?: number;
  lng?: number;
  show_only_in_map: boolean;
}

interface routeImages {
  id: string;
  main: boolean;
}


interface map {
  coordinates: string;
  zoom: string;
  center_lat: number;
  center_lng: number;
}