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
    const now = moment().format('YYYYMMDDHHmmss');
    this.filename = `banner-almeriajs-${now}.png`;
    this.isLoading = true;
    this.service
      .getBanner(this.data)
      .then((banner: any) => {
        this.prepareDownload(banner);
        this.isLoading = false;
      })
      .catch(error => console.log(error));
  }

  prepareDownload(banner: Blob) {
    this.createdLink = URL.createObjectURL(banner);
    this.downloadLink = this.sanitizer.bypassSecurityTrustUrl(this.createdLink);
  }

  ngOnDestroy() {
    URL.revokeObjectURL(this.createdLink);
  }

  close() {
    this.dialogRef.close();
  }
}
