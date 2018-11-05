import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/addedit/addEdit.dialog.html',
  styleUrls: ['../../dialogs/addedit/addEdit.dialog.css']
})
export class AddEditDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private dataService: DataService, private toastrService: ToastrService) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  }

  onYesClick(): void {
    this.dataService.add(this.data.model).subscribe(() => {
      this.dialogRef.close(true);
    }, error => {
      this.toastrService.error(error.error.error.message, 'Add!');
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
