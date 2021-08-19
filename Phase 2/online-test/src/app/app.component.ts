import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import questions from '../assets/questions.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  onlineTest:FormGroup;
  correct:number=0;
  grade:boolean = true;
  final:boolean = false;
  list? = questions;
  
  constructor(public form:FormBuilder) {
    this.onlineTest=form.group({});
  }

  ngOnInit():void {
    this.list.forEach((i: { question: string; })=> {
      this.onlineTest.addControl(i.question, this.form.control(''));
    })
  }

  evaluate():void {
    let answers = this.onlineTest.value;
    let tally:number = 0;
    this.list.forEach((i: { question: any; answer: string; result: string; }) => {
      let choice = i.question;
      if(answers[choice] == i.answer)
      {
        i.result = "Correct!"
        tally++;
      }
      else
      {
        i.result="Incorrect!";
      }
    });

    if(tally >= 5)
    {
      this.grade = true;
    }

    else
    {
      this.grade = false;
    }
    
    this.correct += tally;
    this.final = true;
  }
}