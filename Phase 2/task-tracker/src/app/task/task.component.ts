import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit
{
  tasksArray:Array<Task>=[];
  constructor() { }

  storeTask(taskRef:NgForm){
    let tasks = taskRef.value;
    let newTask:Task = {id:tasks.id, name:tasks.name, taskName:tasks.task, deadline:tasks.deadline};
    this.tasksArray.push(newTask);
    taskRef.reset();
  }

  ngOnInit(): void {
  }

}