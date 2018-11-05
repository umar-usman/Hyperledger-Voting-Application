import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { CandidateWithVote, Auth, Candidate } from '../../../../src/app/models/candidate';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../../../src/app/dialogs/delete/delete.dialog.component';
import { AddEditDialogComponent } from '../../../../src/app/dialogs/addedit/addEdit.dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'main',
  templateUrl: 'main.html',
  styleUrls: ['main.css']
})

export class MainComponent implements OnInit {
  regions: string[] = [];
  selectedRegion: string = null;
  candidates: CandidateWithVote[] = [];
  candidate: Candidate = null;
  authData: Auth = null;
  dataSource = null;

  constructor(private router: Router, private dataService: DataService, public dialog: MatDialog, private toastrService: ToastrService) { }

  ngOnInit() {
    if (this.dataService.isLoggedIn() == false) {
      this.router.navigateByUrl('login');
      return;
    }
    this.authData = this.dataService.getAuthData();

    this.dataService.getRegions().subscribe((regions) => {
      this.regions = regions;

      if (this.authData.is_admin == false) {
        this.selectedRegion = this.authData.constituency;

        this.dataService.getCandidate(this.authData.id).subscribe((result) => {
          this.candidate = result;

          this.refreshData();
        });
      }
      else
        this.refreshData();
    });
  }

  refreshData() {
    if (!this.selectedRegion)
      this.candidates = [];
    else {
      this.dataService.getAll(this.selectedRegion).subscribe((candidates) => {
        this.candidates = candidates;
        this.dataSource = new MatTableDataSource(this.candidates);
      });
    }
  }

  logout() {
    this.dataService.logout();
    this.router.navigateByUrl('login');
  }

  delete(id: string, name: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: id, name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastrService.success('Operation Successful', 'Delete!');
        this.refreshData();
      }
    }, error => {
      this.toastrService.error('Operation Failed', 'Delete!');
    });
  }

  // startEdit(candidate: CandidateWithVote) {

  //   let obj = new Candidate();
  //   obj.id = candidate.id;
  //   obj.name = candidate.name;
  //   obj.symbol = candidate.symbol;
  //   obj.constituency = candidate.constituency;
  //   const dialogRef = this.dialog.open(AddEditDialogComponent, {
  //     data: {model: obj, regions: this.regions}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.dataService.update(result).subscribe(()=> {
  //         this.refreshData();
  //       });
  //     }
  //   });
  // }

  addNew() {
    let obj = new Candidate();
    obj.candidateId = '';
    obj.name = '';
    obj.symbol = '';
    obj.constituency = '';
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      data: { model: obj, regions: this.regions }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.dataService.add(result).subscribe(()=> {
        this.refreshData();
        //});
      }
    });
  }
}

