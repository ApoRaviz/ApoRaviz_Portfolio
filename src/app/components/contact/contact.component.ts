import { Component, AfterViewInit, OnDestroy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly theme = inject(ThemeService);
  private toastTimer?: ReturnType<typeof setTimeout>;

  readonly data = inject(PortfolioDataService);
  readonly submitting = signal(false);
  readonly sent = signal(false);

  // nonNullable ทำให้ form value เป็น string เสมอ ลดเคส null ใน strict TypeScript
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngAfterViewInit(): void {
    this.theme.observeReveals();
  }

  ngOnDestroy(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

  hasError(controlName: 'name' | 'email' | 'message', error: string): boolean {
    const control = this.form.controls[controlName];
    return control.touched && control.hasError(error);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    setTimeout(() => {
      this.submitting.set(false);
      this.sent.set(true);
      this.form.reset();

      this.toastTimer = setTimeout(() => this.sent.set(false), 3000);
    }, 1500);
  }
}
