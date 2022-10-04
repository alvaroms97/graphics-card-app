import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { GraphicsCard } from 'src/models/graphicsCard.model';
import { GraphicsCardList } from './../models/graphicsCardsList.model';

@Injectable({
  providedIn: 'root'
})
export class GraphicsCardsService {

  constructor() { }

  getAll(): Observable<GraphicsCard[]> {
    const data$ = fromFetch('http://localhost:3000/graphics-cards', {
      selector: response => response.json()
    });

    data$.subscribe({
      error: error => console.log(error),
      next: result => result
    });

    return data$;
  }

  getOne(id: string): Observable<GraphicsCard> {
    let url = 'http://localhost:3000/graphics-cards' + '?id=' + id;
    const data$ = fromFetch(url, {
      selector: response => response.json()
    });

    data$.subscribe({
      error: error => console.log(error),
      next: result => result
    });

    return data$;
  }

  getPageWithSearch(pageNumber: number, searchTerm?: string, entriesPerPage?: number): Observable<GraphicsCardList> {
    let url = 'http://localhost:3000/graphics-cards' + '?page=' + pageNumber;

    // If there is search param, it will try to find those that have its name, model or manufacturer matching the string (optional)
    if (searchTerm != null && searchTerm != undefined && searchTerm.trim().length > 0) { url += '&search=' + searchTerm;}
    // If there is numResults param, a number of result per page will be set (optional)
    if (entriesPerPage != null && entriesPerPage != undefined) { url += '&numResults=' + entriesPerPage;}

    const data$ = fromFetch(url, {
      selector: response => response.json()
    });

    data$.subscribe({
      error: error => console.log(error),
      next: result => result
    });

    return data$;
  }
}
