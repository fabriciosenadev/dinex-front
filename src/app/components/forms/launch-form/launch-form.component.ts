import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-launch-form',
  templateUrl: './launch-form.component.html',
  styleUrls: ['./launch-form.component.css']
})
export class LaunchFormComponent implements OnInit {

  @Output() newLaunch: EventEmitter<any> = new EventEmitter();

  // Icons
  faInfo = faInfo;
  
  launchForm: FormGroup = new FormGroup({});
  
  constructor() { }

  ngOnInit(): void {
  }

  handleLaunchForm(): void {
    this.launchForm = new FormGroup({
      launchType: new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      date: new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      idCategory: new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      description: new FormControl(
        '',
        [],
      ),
      amount: new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0.01),
        ],
      ),
      isConfirmed: new FormControl(
        '',
        [],
      ),
      isScheduled: new FormControl(
        '',
        [], 
      ),
    });
  }
  
  getBodyConfirmedHelp(): string {
    let bodyConfirmedHelp = '<h5>Como funciona ?</h5>';
    bodyConfirmedHelp += 'Esta funcionalidade informa se o lançamento foi recebido/pago de acordo com o que foi selecionado no tipo de lançamento.';
    bodyConfirmedHelp += '<br><br><hr><br>';
    bodyConfirmedHelp += '<h5>Como eu sei se ativei?</h5>';
    bodyConfirmedHelp += 'Quando o opção estiver selecionada, o botao ficará preenchido com verde.';
    return bodyConfirmedHelp;
  }

  getBodySchedulingHelp(): string {
    let bodyConfirmedHelp = '<h5>Como funciona ?</h5';
    bodyConfirmedHelp += 'Esta funcionalidade informa se o lançamento deve se repetir no proximo mês.';
    bodyConfirmedHelp += '<br><br><hr><br>';
    bodyConfirmedHelp += '<h5>Como eu sei se ativei?</h5>';
    bodyConfirmedHelp += 'Quando o opção estiver selecionada, o botao ficará preenchido com verde.';
    return bodyConfirmedHelp;
  }
}
