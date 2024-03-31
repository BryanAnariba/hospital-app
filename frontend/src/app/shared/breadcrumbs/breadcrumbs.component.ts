import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnDestroy {

  public title: string = '';
  public titleSubscribe$: Subscription;

  // Siempre que creas un observable de manera manual ay que eliminar la susbcripcion, ya que puede causar problkemas de rendimiento
  ngOnDestroy(): void {
    this.titleSubscribe$.unsubscribe();
  }
  
  constructor (private router: Router) {
    this.titleSubscribe$ = this.getRouteArgs()
      .subscribe({
        next: (data) => {
          // console.log(data);
          this.title = data.title;
        },
      });
  }

  public getRouteArgs() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd && event.snapshot.firstChild === null),
        map((event: ActivationEnd | any) => event.snapshot.data),
      );
  }

}
