import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../services/VoiceRecognition/voice-recognition.service';

@Component({
  selector: 'speech-to-do',
  templateUrl: './speech-to-do.component.html',
  styleUrls: ['./speech-to-do.component.scss'],
  providers: [VoiceRecognitionService],
})
export class SpeechToDoComponent implements OnInit {
  recording = false;
  loading = false;
  breakword: string = 'Stop';
  checkConcatenate: boolean = true;
  todos: { text: string; state: boolean }[] = [];

  constructor(public service: VoiceRecognitionService) {
    this.service.init();
  }

  ngOnInit(): void {}

  startService() {
    if (!this.recording) {
      this.service.start(() => {
        this.recording = false;
      });
      this.recording = true;
    }
  }

  stopService() {
    this.service.stop();
  }

  clear() {
    this.service.clear();
  }

  getBestPath() {
    this.recording = false;
    this.loading = true;
    this.service.getTodos(
      (todos) => {
        this.loading = false;
        this.todos = todos.map((t) => {
          return { text: t, state: false };
        });
      },
      this.breakword,
      this.checkConcatenate
    );
  }
}
