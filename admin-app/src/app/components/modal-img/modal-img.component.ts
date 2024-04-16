import { Component } from '@angular/core';
import { ModalImgService } from '../../services/modal-img.service';
import { FileUploadService, typeOfImg } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrl: './modal-img.component.css'
})
export class ModalImgComponent {

  public imageUpload: File | undefined;
  public imageTemporal: any = '';

  constructor (
    public readonly modalImgService: ModalImgService, 
    private readonly fileUploadService: FileUploadService,
  ) {}
  
  public onChangeImg(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.imageUpload = file;

    if (!file) {
      this.imageTemporal = null;
      Swal.fire('Error', 'Image not loaded!', 'error');
    } else {
      // console.log({file});
      const reader = new FileReader();
      reader.readAsDataURL(file!);
      reader.onloadend = () => {
        // Esta es la imagen en formato 64
        // console.log(reader.result);
        this.imageTemporal = reader.result;
      }
    }
  }

  public uploadUserImage() {
    const id: string = this.modalImgService.id;
    const type: typeOfImg = this.modalImgService.type;

    if (this.imageUpload) {
      this.fileUploadService.updatePhoto(this.imageUpload, type, id)
        .subscribe({
          next: (data) => {
            console.log({newImage: data.img});
            this.modalImgService.imageUploaded.emit(data.img);
            this.modalImgService.closeModal();
            Swal.fire('Success', 'Image Upload Succesfully', 'success');
          },
          error: (error) => {
            Swal.fire('Error', error.error.error, 'error');
          }
        });
    } else {
      Swal.fire('Error', 'Image no provided', 'error');
    }   
  }

  public hideModal () {
    this.imageTemporal = null;
    this.modalImgService.closeModal()
  }
}
