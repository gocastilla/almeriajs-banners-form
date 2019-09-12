import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  public createdLink: string;
  public downloadLink: SafeUrl;
  public filename: string;
  public isLoading: boolean;

  constructor(
    private service: AppService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.filename = `banner-almeriajs-${moment().format('YYYYMMDDHHmmss')}.png`;
    this.service
      .getBanner(this.data)
      .then(banner => {
        this.createdLink = URL.createObjectURL(banner);
        this.downloadLink = this.sanitizer.bypassSecurityTrustUrl(
          this.createdLink
        );
        this.isLoading = false;
      })
      .catch(error => console.log(error));
  }

  ngOnDestroy() {
    URL.revokeObjectURL(this.createdLink);
  }

  close() {
    this.dialogRef.close();
  }
}
