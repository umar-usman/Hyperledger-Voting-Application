import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  onYesClick(): void {
    this.dataService.delete(this.data.id).subscribe(() => {
      this.dialogRef.close(true);
    });
    
  }              

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
