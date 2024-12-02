import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { task } from './../../models/task.mode';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear componentes',
      completed: false
    }
  ]); 

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });

  changHandler() {
    if(this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if(value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, postition) => {
        if(postition === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }



}
