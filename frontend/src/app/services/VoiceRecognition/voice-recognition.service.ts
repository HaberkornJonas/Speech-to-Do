import { Injectable } from '@angular/core';
import { TodoService } from '../api/todo.service';
import { HttpClient } from '@angular/common/http';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  public showRequest = '';
  public tempWords = '';
  public error = '';
  public todos: string[];

  todoAPI = new TodoService(this.httpClient);

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  nonRecordingSecInARow = 0;

  constructor(private httpClient: HttpClient) {}

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'de-DE';

    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start(endCallback: () => void) {
    this.showRequest = '';
    this.todos = [];
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log('Speech recognition started');

    var interval = setInterval(() => {
      if (this.tempWords.length === 0) {
        this.nonRecordingSecInARow = this.nonRecordingSecInARow + 1;
        if (this.nonRecordingSecInARow == 3) {
          this.nonRecordingSecInARow = 0;
          this.isStoppedSpeechRecog = true;
          this.recognition.stop();
          clearInterval(interval);
        }
      } else {
        this.nonRecordingSecInARow = 0;
      }
    }, 1000);

    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        endCallback();
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    });
  }

  stop() {
    this.isStoppedSpeechRecog = true;
  }

  clear() {
    this.tempWords = '';
    this.showRequest = '';
    this.todos = [];
  }

  getTodos(
    callback: (todos: string[]) => void,
    breakword: string,
    checkConcatenate: boolean
  ) {
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.stop();

    if (this.showRequest.length > 0)
      this.todoAPI
        .getTodos(this.showRequest, breakword, checkConcatenate)
        .subscribe(
          (res) => {
            this.todos = res;
            console.log('Path returned by the API: ', res);
            callback(this.todos);
          },
          (error) => {
            this.error = error.message;
            callback(this.todos);
          }
        );
  }

  wordConcat() {
    if (this.tempWords.length > 0) {
      this.showRequest = this.showRequest + ' ' + this.tempWords;
    }

    this.tempWords = '';
  }
}
