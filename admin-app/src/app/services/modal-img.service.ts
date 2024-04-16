import { EventEmitter, Injectable } from '@angular/core';
import { typeOfImg } from './file-upload.service';
import { environment } from '../../environments/enviornments';

@Injectable({
  providedIn: 'root'
})
export class ModalImgService {
  public imageUploaded: EventEmitter<string> = new EventEmitter<string>();
  public type: typeOfImg = typeOfImg.USERS;
  public id: string = '';
  public img: string = '';
  private _hideModal: boolean = true;

  constructor() { }

  public get hideModal () {
    return this._hideModal;
  }

  public openModal(type: typeOfImg, id: string, img: string) {
    this.type = type;
    this.id = id;
    this._hideModal = false;
    if (img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${environment.base_url}/uploads/users/${(img.trim().length === 0) ? 'img-not-found.png' : img}`;
    }
  }

  public closeModal() {
    this._hideModal = true;
  }
}
