import { Injectable, signal } from '@angular/core';

export interface AddressBookEntry {
  id: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  state: string;
  postcode: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {
  private entries = signal<AddressBookEntry[]>([
    {
      id: '1',
      name: 'Ahmad bin Ali',
      email: 'ahmad.ali@example.com.my',
      phone: '0123456789',
      street: 'Jalan SS2/24, Petaling Jaya',
      state: 'Selangor',
      postcode: '47300',
      description: 'First test user'
    },
    {
      id: '2',
      name: 'Tan Mei Ling',
      email: 'meiling.tan@example.com.my',
      phone: '0198765432',
      street: 'Jalan Wong Ah Fook',
      state: 'Johor',
      postcode: '80000',
      description: 'Second test user'
    }
  ]);

  private states: string[] = [
    'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
    'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah',
    'Sarawak', 'Selangor', 'Terengganu', 'Kuala Lumpur',
    'Labuan', 'Putrajaya'
  ];

  constructor() { }

  getEntries() {
    return this.entries.asReadonly();
  }

  getStates(): string[] {
    return this.states;
  }

  addEntry(entry: Omit<AddressBookEntry, 'id'>): void {
    const newEntry: AddressBookEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9)
    };
    this.entries.update(entries => [...entries, newEntry]);
  }

  updateEntry(updatedEntry: AddressBookEntry): void {
    this.entries.update(entries => 
      entries.map(e => e.id === updatedEntry.id ? updatedEntry : e)
    );
  }

  deleteEntry(id: string): void {
    this.entries.update(entries => entries.filter(e => e.id !== id));
  }
}
