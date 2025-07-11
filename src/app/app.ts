import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  useGetCountQuery } from './store/api-slice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  countQuery = useGetCountQuery();
  log(countQuery: any): void {
    console.log(countQuery+"dsfsdf");
  }
  protected title = 'my-cool-app';
}
