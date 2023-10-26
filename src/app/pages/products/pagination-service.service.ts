import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationServiceService {

  constructor() { }


  currentPage: number = 1;

  setPage(page: number) {
    this.currentPage = page;
  }

  getPage() {
    return this.currentPage;
  }
}
