import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrl: './promises.component.css'
})
export class PromisesComponent implements OnInit {

  ngOnInit(): void {
    console.log('Inicio ngOnInit');

    const promise = new Promise((resolve, reject) => {
      const isOk: boolean = false;
      if (isOk) {
        resolve('Hello World');
      } else {
        reject('Something went wrong');
      }
    });

    promise
      .then((res) => {
        console.log('Promise Finished: ' + res)
      })
      .catch((error) => {
        console.error('Error in promise: ' + error);
      });


    this.getUsers()
      .then(users => console.log(users));

    console.log('Fin ngOnInit');

  }

  public getUsers (): Promise<any[]> {
    return new Promise((resolve) => {
      fetch(`https://reqres.in/api/users`)
      .then(res => res.json())
      .then(body => resolve(body.data));
    });
  }

}
