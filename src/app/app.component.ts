import { Component } from '@angular/core';
import { TodosService } from './todos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private todoService : TodosService){
    this.getTodos()
  }

  title = 'Todo List';

  inputContent :any = ""
  somethingAdded : boolean = false;

  todos : any =[]

  addTodo():void{
    const data ={
      content : this.inputContent,
      done : false
    }
    this.todoService.createTodo(data).subscribe(() => {
      this.inputContent = ""
    }),(_error: any) =>{
      console.log(_error)
    }
    this.somethingAdded = true;
    this.getTodos()
    this.resetSomethingAdded()
  }

  getTodos(){
    this.todoService.getTodos().subscribe((todos : any[])=>{
      this.todos = todos
    })
  }

  deleteTodo(id:number){
    this.todoService.deleteTodo(id).subscribe(() =>{
      this.todoService.getTodos().subscribe((todos : any[])=>{
        this.todos = todos
      })
    })
  }
  resetSomethingAdded():void{
    setTimeout(()=>{
      this.somethingAdded = false
    },100)
  }
}
