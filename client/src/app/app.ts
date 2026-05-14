import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { error } from 'console';
import { promises } from 'dns';
import { response } from 'express';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient); 
  protected title = 'Dating app';
  protected members = signal<any>([])
  //protected members: any;
  


async ngOnInit() {
this.members.set(await this.getMembers())
// this.http.get('https://localhost:5001/api/members').subscribe({
//   next: response => this.members =response,
//   error: error => console.log(error),
//   complete: () => console.log('done')  
// })

}



async getMembers(){
try {
  return  lastValueFrom(this.http.get('https://localhost:5001/api/members'));
} catch (error) { 
  console.log(error);
  throw error; 
 }

 }

}

