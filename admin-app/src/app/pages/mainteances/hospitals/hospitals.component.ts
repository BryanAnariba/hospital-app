import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalsService } from '../../../services/hospitals.service';
import { Hospital } from '../../../models';
import { Subject, Subscription, debounceTime, delay } from 'rxjs';
import { SearchByService } from '../../../services/search-by.service';
import { searchByType } from '../../../enums/search.enums';
import { typeOfImg } from '../../../services/file-upload.service';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { ModalImgService } from '../../../services/modal-img.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.css',
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitalType: typeOfImg = typeOfImg.HOSPITALS;

  // PARA PAGINACION
  public limit: number = 5;
  public skip: number = 1;
  public totalHospitals: number = 0;

  // PARA DATOS
  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];

  // PARA BUSQUEDAS Y CARGA DE DATOS
  public isLoading: boolean = false;
  public debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;
  private imageUploadedSuscription?: Subscription;

  constructor(
    private readonly hospitalsService: HospitalsService,
    private readonly searchByService: SearchByService,
    private readonly authService: AuthService,
    private readonly modalImgService: ModalImgService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();

    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(400))
      .subscribe((value) => {
        this.searchByTerm(value);
      });

    // CADA VEZ QUE SE USA EL SERVICECO DE MODAL IMAGEN HACEMOS LA CARGA DE HOSPITALES
    this.imageUploadedSuscription = this.modalImgService.imageUploaded
      .pipe(
        delay(100),
      )
      .subscribe(
        img => this.loadHospitals()
      );
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
    this.imageUploadedSuscription?.unsubscribe();
  }

  // PAGINATION
  public loadHospitals() {
    this.isLoading = true;
    this.hospitalsService.getHospitals(this.limit, this.skip).subscribe({
      next: (data) => {
        this.hospitals = data.hospitals;
        this.totalHospitals = data.totalHospitals;
        this.hospitalsTemp = this.hospitals;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  public loadHospitalsUsingPagination(value: number) {
    this.skip += value;
    if (this.skip < 1) {
      this.skip = 1;
    } else if (this.skip > this.totalHospitals) {
      this.skip -= value;
    }
    this.skip;
    this.loadHospitals();
  }

  // DEBOUNCER FOR SEARCH BY NAME
  public onKeyPress(term: string) {
    // console.log({term});
    this.debouncer.next(term);
  }

  public searchByTerm(term: string) {
    if (!term || term.trim().length === 0) {
      this.hospitals = this.hospitalsTemp;
    } else {
      this.isLoading = true;
      this.searchByService.searchBy(searchByType.HOSPITALS, term).subscribe({
        next: (data: any) => {
          this.hospitals = data;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  // CRUD METHODS
  public updateChanges(hospital: Hospital) {
    // console.log(hospital)
    this.hospitalsService.updateHospital(hospital._id, hospital.name, hospital.email, hospital.userCreatedHospital._id)
      .subscribe({
        next: (data) => {
          Swal.fire('Updated!', `Hospital: ${hospital.name} updated successfully`, 'success');
        },
        error: (error) => {
          Swal.fire('Sometime went wrong', error.error.error, 'error');
        }
      });
  }

  public deleteHospital (hospital: Hospital) {
    this.hospitalsService.deleteHospital(hospital._id)
      .subscribe({
        next: (data) => {
          Swal.fire('Deleted!', `Hospital ${hospital.name} deleted successfully`, 'success');
          this.loadHospitals();
        },
        error: (error) => {
          Swal.fire('Sometime went wrong', error.error.error, 'error');
        }
      });
  }

  public async getHospitalData () {
    const {value: name} = await Swal.fire<string>({
      title: 'Add New Hospital',
      input: "text",
      inputLabel: "HOSPITAL NAME:",
      inputPlaceholder: "Enter Hospital Name",
      showCancelButton: true,
    });
    if (name && name.trim().length > 0) {
      const {value: email} = await Swal.fire<string>({
        title: 'Add New Hospital',
        input: "text",
        inputLabel: "HOSPITAL EMAIL:",
        inputPlaceholder: "Enter Hospital Email",
        showCancelButton: true,
      });
      if (email && email.trim().length > 0) {
        this.saveHospital(name, email);
      }
    }
  }

  public saveHospital (name: string, email: string) {
    this.hospitalsService.createNewHospital(name,email, this.authService.userId)
    .subscribe({
      next: (data) => {
        Swal.fire('Created!', `Hospital ${name} created`, 'success');
        this.loadHospitals();
      },
      error: (error) => {
        Swal.fire('Sometime went wrong!', error.error.error, 'error');
      }
    })
  }

  public openModal(hospital: Hospital) {
    // console.log(user);
    this.modalImgService.openModal(typeOfImg.HOSPITALS, hospital._id!, hospital.img);
  }
}
