import { z } from 'zod';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../../services/client-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { clientSchema } from '../../../../shared/schemas/client-schema';

@Component({
  selector: 'app-client-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss'
})
export class ClientForm implements OnInit {
  name = '';
  email = '';
  phone = '';
  errors: z.ZodIssue[] = [];

  private clientService = inject(ClientService);
  private dialogRef = inject(MatDialogRef<ClientForm>);
  private fb = inject(FormBuilder);
  private data = inject(MAT_DIALOG_DATA, { optional: true });

  clientForm: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[a-zA-Z\\s.-]+$')
    ]],
    email: ['', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]],
    phone: ['', [
      Validators.required,
      Validators.pattern('^[0-9+-\\s]*[0-9]+$'),
      Validators.minLength(7), 
      Validators.maxLength(20)
    ]]
  });

  ngOnInit() {
    if (this.data) {
      this.clientForm.patchValue(this.data);
    }

    this.clientForm.valueChanges.subscribe(() => {
      this.errors = [];
    });
  }

  onSave() {
    if (!this.clientForm.valid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const parsed = clientSchema.safeParse(this.clientForm.value);
    if (!parsed.success) {
      console.error(parsed.error.issues);
      this.errors = parsed.error.issues;
      return;
    }

    const isUpdate = Boolean(this.clientForm.get('id')?.value);
    const request$ = isUpdate
      ? this.clientService.updateClient(parsed.data)
      : this.clientService.addClient(parsed.data);

    request$.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) =>
        console.error(`Failed to ${isUpdate ? 'update' : 'add'} client`, err)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}