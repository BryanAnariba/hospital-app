import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../interfaces';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../models';
import Swal from 'sweetalert2';
import { FileUploadService, typeOfImg } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public imageUpload: File | undefined;
  public imageTemporal: any = '';
  public roles!: Role[];
  public user!: User;

  constructor (
    private readonly formBuilder: FormBuilder, 
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly authService: AuthService,
    private readonly fileUploadService: FileUploadService,
  ) {
    this.user = this.authService.loggedUser;
  }
  
  ngOnInit(): void {
    this.roleService.getRoles()
      .subscribe({
        next: (data) => {
          this.roles = data.roles;
          //console.log(this.roles)
        },
        error: (error) => {
          console.error(error);
        },
      });

    this.profileForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [this.user.role._id, [Validators.required]],
    });
  }

  public updateProfile () {
    //console.log(this.profileForm.value);
    this.userService.updateUserProfile(this.profileForm.value)
      .subscribe({
        next: (data) => {
          this.user.name = this.profileForm.get('name')?.value;
          this.user.email = this.profileForm.get('email')?.value;
          console.log(this.authService.loggedUser)
          Swal.fire('Success', 'Changes Save Succesfully', 'success');
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Error', error.error.error, 'error');
        }
      });
  }
  
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
    if (this.imageUpload) {
      this.fileUploadService.updatePhoto(this.imageUpload, typeOfImg.USERS, this.authService.userId)
        .subscribe({
          next: (data) => {
            console.log({newImage: data.img});
            this.user.img = data.img;
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
}
