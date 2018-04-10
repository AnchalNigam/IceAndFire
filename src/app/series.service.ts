import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
@Injectable()
export class SeriesService {
  public baseUrl = "https://anapioficeandfire.com/api";
  constructor(private _http: HttpClient) {
    console.log("series service called");
  }

  //method to get all books
  public getBooks = (): any => {
    let response = this._http.get(`${this.baseUrl}/books`);
    return response;

  }
  //method to get all houses
  public getHouse = (): any => {
    let response = this._http.get(`${this.baseUrl}/houses`);
    return response;

  }
  //method to get all characters
  public getCharacter = (): any => {
    let response = this._http.get(`${this.baseUrl}/characters`);
    return response;

  }
  //method to get specific category for single page view
  public getCategory = (entityName, id): any => {
    let response = this._http.get(`${this.baseUrl}/${entityName}/${id}`);
    return response;

  }

  //method to get character info which is present in array of urls
  public getSingleDetail = (myUrl): any => {

    let response = this._http.get(`${myUrl}`);
    return response;

  }



}
