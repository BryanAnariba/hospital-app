import { Pipe, PipeTransform } from '@angular/core';
import { typeOfImg } from '../../services/file-upload.service';
import { environment } from '../../../environments/enviornments';

@Pipe({
  name: 'loadImage'
})
export class LoadImagePipe implements PipeTransform {

  transform(img: string = '', type: typeOfImg): string {
    if (img.includes('https') || img.includes('http')) return img;
    if (img) return `${environment.base_url}/uploads/${type}/${img}`;
    return `${environment.base_url}/uploads/${type}/img-not-found.png`;
  }

}
