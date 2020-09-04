import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<InfoComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data) {
  }

  ngOnInit(): void {
  }

  close(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
  }

}
