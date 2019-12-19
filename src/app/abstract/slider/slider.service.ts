import {Injectable} from '@angular/core';
import {SliderImage} from "../../model/slider-image";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SliderService {


  currentIndex: number;

  getSlideArrayByImageLinks(links: string[]): SliderImage[] {
    return links.map(link => {
        return {
          img: link
        }
      }
    )
  }
}
