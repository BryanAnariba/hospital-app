import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalsService } from '../../../services/hospitals.service';
import { Hospital } from '../../../models';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { SearchByService } from '../../../services/search-by.service';
import { searchByType } from '../../../enums/search.enums';
import { typeOfImg } from '../../../services/file-upload.service';

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

  constructor(
    private readonly hospitalsService: HospitalsService,
    private readonly searchByService: SearchByService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();

    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(400))
      .subscribe((value) => {
        this.searchByTerm(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

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
}
