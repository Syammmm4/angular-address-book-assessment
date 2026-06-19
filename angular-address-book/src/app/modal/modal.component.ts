import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AddressBookEntry, AddressBookService } from '../services/address-book.service';
import { DxTextBoxModule, DxSelectBoxModule, DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxButtonModule
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() data: AddressBookEntry | null = null;
  @Output() save = new EventEmitter<Omit<AddressBookEntry, 'id'> | AddressBookEntry>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  states: string[] = [];
  mode: 'Create' | 'View' | 'Edit' = 'Create';

  constructor(
    private fb: FormBuilder,
    private addressBookService: AddressBookService
  ) {
    this.states = this.addressBookService.getStates();
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern('^[^a-zA-Z]*$')]],
      street: [''],
      state: [''],
      postcode: ['', [Validators.pattern('^[0-9]*$')]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.initForm();
    }
  }

  initForm(): void {
    if (this.data) {
      this.mode = 'View';
      this.form.patchValue(this.data);
      this.form.disable();
    } else {
      this.mode = 'Create';
      this.form.reset();
      this.form.enable();
    }
  }

  onEdit(): void {
    this.mode = 'Edit';
    this.form.enable();
  }

  onSave(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      if (this.mode === 'Create') {
        this.save.emit(formValue);
      } else if (this.mode === 'Edit' && this.data) {
        this.save.emit({ ...formValue, id: this.data.id });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
