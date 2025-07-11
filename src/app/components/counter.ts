// import {  useGetCountQuery } from '@app/core/api';
import {  useGetCountQuery } from '../store/api-slice';
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-manager',
  template: `
    <section>

      <span>{{ countQuery.data()?.email ?? 0 }}</span>

    </section>
  `,
})
export class CounterManagerComponent {
  countQuery = useGetCountQuery();

  constructor() {
    console.log('Counter component initialized');
  }

  ngOnInit() {
    console.log('Count query data:', this.countQuery.data());
  }
}
