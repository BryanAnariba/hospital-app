import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models';
import { SearchByService } from '../../../services/search-by.service';
import { searchByType } from '../../../enums/search.enums';
import { Subject, Subscription, debounceTime, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../interfaces';
import { ModalImgService } from '../../../services/modal-img.service';
import { typeOfImg } from '../../../services/file-upload.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, OnDestroy {

  // PARA PAGINACION
  public totalUsers: number = 0;
  public skip: number = 1;
  public limit: number = 5;

  // PARA DATOS
  public users: User[] = [];
  public usersTemp: User[] = [];
  public roles: Role[] = [];

  // PARA BUSQUEDAS
  public loading: boolean = false;
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;
  private imageUploadedSubscription?: Subscription;

  constructor(
    private readonly userService: UserService,
    private readonly searchByService: SearchByService,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
    private readonly modalImgService: ModalImgService,
  ) {}

  ngOnInit(): void {
    // CARGAS INICIALES USUARIOS Y ROLES
    this.loadUsers();
    this.loadRoles();

    // DEBOUNCER PARA BUSQUEDAS
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(400))
      .subscribe((value) => {
        this.searchByTerm(value);
      });

    // CUANDO SE CAMBIA UNA IMAGEN
    this.imageUploadedSubscription = this.modalImgService.imageUploaded
      .pipe(
        delay(100),
      )
      .subscribe(img => this.loadUsers());
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
    this.imageUploadedSubscription?.unsubscribe;
  }

  public changeSkip(value: number) {
    this.skip += value;
    if (this.skip < 1) {
      this.skip = 1;
    } else if (this.skip > this.totalUsers) {
      this.skip -= value;
    }
    this.loadUsers();
  }

  public onDeleteUser(user: User) {
    // console.log(user);
    if (this.authService.userId === user._id) return Swal.fire('Error', 'You cannot delete yourself', 'error');

    return Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete the user ${user.email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user._id!).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Deleted!',
              text: `User ${data.email} deleted`,
              icon: 'success',
            });
            this.loadUsers();
          },
          error: (error) => {
            Swal.fire('Error', error.error.error, 'error');
          },
        });
      }
    });
  }

  public loadUsers() {
    this.loading = true;
    this.userService.getUsers(this.limit, this.skip).subscribe({
      next: ({ totalUsers, users }) => {
        this.users = users;
        this.usersTemp = users;
        if (this.users.length !== 0) {
          this.totalUsers = totalUsers;
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  public loadRoles () {
    this.roleService.getRoles()
      .subscribe({
        next: (data) => {
          this.roles = data.roles;
        },
        error: (error) => {
          Swal.fire('Error', error.error.error, 'error');
        }
      })
  }

  public onChangeRole(user: User, newRole: string) {
    // console.log({user, newRole: newRole});
    this.userService.updateUserRole(user, newRole)
    .subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Success!',
          text: `User ${data.email} role updated!`,
          icon: 'success',
        });
        this.loadUsers();
      },
      error: (error) => {
        Swal.fire('Error', error.error.error, 'error');
      },
    });
  }

  public openModal(user: User) {
    // console.log(user);
    this.modalImgService.openModal(typeOfImg.USERS, user._id!, user.img);
  }

  public onKeyPress(term: string) {
    this.debouncer.next(term);
  }

  public searchByTerm(term: string) {
    if (term.length === 0) {
      this.users = this.usersTemp;
    } else {
      //console.log({term});
      this.loading = true;
      this.searchByService.searchBy(searchByType.USERS, term).subscribe({
        next: (data) => {
          console.log(data);
          this.users = data as User[];
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }
}
