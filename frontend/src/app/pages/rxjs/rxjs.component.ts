import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent implements OnDestroy {

  public intervalSubscription$: Subscription;

  constructor () {
    // Suscribirse
    // this.returnObservable()
    //   .pipe(
    //     retry(1) // cantidad de intentos en parentesis aqui es a nuestra discrecion
    //   )
    //   .subscribe({
    //     next: (value) => console.log('Subscription value: ' + value),
    //     error: (error) => console.error(error),
    //     complete: () =>  console.info('Observer finished')     
    //   });

    this.intervalSubscription$ = this.returnIntervalObservable()
      .pipe(
        map(value => value + 1), // muta mi respuesta en este caso al valor que retorna el observable sumale 1 para eso es el map
        filter(value => value % 2 === 0 ? true : false), // filtra solo lo que cumpla esta condicion en este caso seria solo 1 y 3  ojo el map me muta por eso despues del map para eso el filter
        //take(10), // quiero nada mas 4 emisiones del observable para eso es el take
      )
      .subscribe({
        next: (value) => console.log({value}),
        complete: () => console.log('Finished observer'),
      });
  }

  // Limpiar observable eso es vital para evitar consumo innecesario de recursos
  ngOnDestroy(): void {
    this.intervalSubscription$.unsubscribe();
  }

  public returnIntervalObservable(): Observable<number> {
    const interval$ = interval(500);
    return interval$;
  }

  public returnObservable (): Observable<number> {
    let i = 0;
    return new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }
        
        if (i === 2) {
          observer.error('Ups del dos no pasas, comentalo si queres que termine mi loco!');
        }
        

      }, 1500);
    });
  }
  
}
