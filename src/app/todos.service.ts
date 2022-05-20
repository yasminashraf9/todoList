import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(public http : HttpClient) { }

  url: string = 'http://localhost:3000/todos'
  doneTodos:number = 0;
  
  // get all books entered => get
  getTodos():any{
    return this.http.get(this.url)
  }
  getSelectedTodo(id :any):any{
    return this.http.get(`${this.url}/${id}`)
  }
  // Create a new Book => Post
  createTodo(data : any){
    return this.http.post(this.url , data);
  }
  // Update a certain Book => Put
  updateTodo(id :any, data : any){
    return this.http.put(`${this.url}/${id}`, data)
  }
  // delete a certain book => delete
  deleteTodo(id : any){
    return this.http.delete(`${this.url}/${id}`)
  }

}
