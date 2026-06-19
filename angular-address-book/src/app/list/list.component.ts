import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxButtonModule, DxPopupModule } from 'devextreme-angular';
import { AddressBookService, AddressBookEntry } from '../services/address-book.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    ModalComponent
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  entries: Signal<readonly AddressBookEntry[]>;
  isPopupVisible = false;
  selectedRowData: AddressBookEntry | null = null;

  constructor(private addressBookService: AddressBookService) {
    this.entries = this.addressBookService.getEntries();
  }

  onAddClick() {
    this.selectedRowData = null;
    this.isPopupVisible = true;
  }

  onRowClick(e: any) {
    this.selectedRowData = e.data;
    this.isPopupVisible = true;
  }

  onDeleteClick = (e: any) => {
    // stop propagation if possible so rowClick is not triggered
    if (e.event) {
      e.event.preventDefault();
      e.event.stopPropagation();
    }
    
    if (window.confirm('Are you sure you want to delete this record?')) {
      this.addressBookService.deleteEntry(e.row.data.id);
    }
  }

  onModalSave(data: any) {
    if (data.id) {
      this.addressBookService.updateEntry(data);
    } else {
      this.addressBookService.addEntry(data);
    }
    this.isPopupVisible = false;
  }

  onModalCancel() {
    this.isPopupVisible = false;
  }
}
