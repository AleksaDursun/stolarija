import {Component, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  @Output() publicLink = new EventEmitter<string>();

  files: File[] = [];

  constructor(private Api: ApiService, private storage: AngularFireStorage) {
  }

  onFileSelected(event): void {
    const n = Date.now();
    const file = event.addedFiles[0];
    this.files = event.addedFiles;
    const filePath = `Images/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Images/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            this.publicLink.emit(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          // console.log(url);
        }
      });
  }

  removeImage(event): void {
    this.publicLink.emit('');
    this.files.splice(this.files.indexOf(event), 1);
  }
}
