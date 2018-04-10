import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../series.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public books;
  public houses;
  public character;
  public allInOne = [];
  public final;
  public setChar = [];

  public inputValue: string = "ascending";
  public categoryValue: string = "Select";
  public textValue: string = "";
  p: number = 1;

  constructor(private series: SeriesService, private spinnerService: Ng4LoadingSpinnerService) {
    console.log("Home component called");
  }

  ngOnInit() {
    this.spinnerService.show();
    this.books = this.series.getBooks().subscribe(   //this is getting book data
      data => {

        this.books = data;

        this.all(this.books);
      },
      error => {
        console.log(error.errorMessage);
        alert(`error`);
      });
    this.houses = this.series.getHouse().subscribe(     //this is getting house data
      data => {

        this.houses = data;

        this.all(this.houses);

      },
      error => {
        console.log(error.errorMessage);
        alert(`error`);
      });
    this.character = this.series.getCharacter().subscribe(          //this is getting character data
      data => {

        this.character = data;
        this.setChar = this.setCharName(this.character);
        this.all(this.setChar);


      },
      error => {
        console.log(error.errorMessage);
        alert(`error`);
      });





  }

  //method to concat all data in one variable
  public all = (data): any => {                      //this is getting evry data in one variable
    this.allInOne.push(data);
    setTimeout(() => {
      this.spinnerService.hide();
      this.final = [].concat(...this.allInOne);
    }, 2000);

  }


  //for making first letter capital
  public capital = (a: string): string => {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }; //end

  //for getting id of categories like character,house,books
  public getId = (a: string): string => {
    let pos = a.lastIndexOf('/');
    let id = a.substr(pos + 1);
    return id;
  }; //end

  // To store alias name in character name which is empty
  public setCharName = (data): any => {
    for (let character of data) {
      if (character.name.length == 0) {
        character.name = character.aliases[0];
      }
    }
    return data;
  }

}
