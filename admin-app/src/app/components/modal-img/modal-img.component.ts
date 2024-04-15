import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrl: './modal-img.component.css'
})
export class ModalImgComponent {

  public hidedModal: boolean = false;

  public closeModal () {
    this.hidedModal = true;
  }
}
