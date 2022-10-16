import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bid-dialog',
  templateUrl: './bid-dialog.component.html',
  styleUrls: ['./bid-dialog.component.css']
})
export class BidDialogComponent implements OnInit {
  bidMessage = '';
  model: any;
  activeUser: any;

  constructor(
    public dialogRef: MatDialogRef<BidDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BidDialogComponent
  ) { 
    this.model = data.model;
    this.activeUser = data.activeUser;
  }

  ngOnInit(): void {
  }

  onConfirm(): void {
    // Close the dialog, return true
    if (this.bidMessage.length == 0) {
      return;
    }
    this.dialogRef.close({message:this.bidMessage, model: this.model, activeUser: this.activeUser});
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
