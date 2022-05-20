import { Component, OnInit, Output, EventEmitter, Input ,OnChanges, getDebugNode} from '@angular/core';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit,OnChanges {

  constructor(private todoService: TodosService) {
  }

  

  ngOnInit(): void {
    this.getTodos();
  }
  ngOnChanges(change : any):void{
    if(change.todoAdded.currentValue){
      this.getTodos()
    }
  }
  @Output() editEvent = new EventEmitter()

  @Input() todoAdded: any ;

  todos:any = [] ;
  
  doneTodos : any ;
  
  
  getTodos(): void{
    this.todoService.getTodos().subscribe((todos : any[])=>{
      this.todos = todos
    })
    this.doneTodos = (this.todos.filter((todo:any)=> todo.done === true)).length
  }
  editContent(id:number){
    this.todoService.getSelectedTodo(id).subscribe((todo : any)=>{
      this.editEvent.emit(todo.content)
      this.deleteTodo(id)
    })
  }
  deleteTodo(id : number){
    this.todoService.deleteTodo(id).subscribe()
    this.getTodos()
    console.log(this.doneTodos)
  }
  doneTodo(todo:any){
    todo.done = true 
    this.todoService.updateTodo(todo.id,todo).subscribe(() =>{
      this.getTodos()
    })
    console.log(this.doneTodos)
  }
  
  
}
