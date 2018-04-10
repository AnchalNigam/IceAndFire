import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from '../series.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css'],
  providers:[Location]
})
export class SingleViewComponent implements OnInit {
  public all;
  public character = [];    //final data which is renedered in view(this stores that after coverting url value into name of category)
  public precharacter = []; // data is stored in this when it comes from api
  public house = [];
  public preHouse = [];
  public book = [];
  public prebook = [];
  public check;
  constructor(private _route: ActivatedRoute, private router: Router, private series: SeriesService,private spinnerService: Ng4LoadingSpinnerService,private location:Location) { }

  ngOnInit() {
    this.spinnerService.show();
    let entityName = this._route.snapshot.paramMap.get('entityName');
    let id = this._route.snapshot.paramMap.get('id');
    this.all = this.series.getCategory(entityName, id).subscribe(      //for getting single category
      data => {

        this.all = data;

        this.setVar(entityName, this.all);
      },
      error => {
        console.log(error.errorMessage);
        alert(`error`);
      });

  }

  //method to  set variable acording to return object
  public setVar = (name: string, data) => {
    if (name == "characters") {
      this.precharacter = data;
      setTimeout(()=> {
      this.character = this.getDetails(this.precharacter);   
      this.spinnerService.hide();
      },2000);  //passsing to get detail function

    }
    else if (name == "books") {
      this.prebook = data;
      setTimeout(()=> {
      this.book = this.getDetails(this.prebook);
      this.spinnerService.hide();
      },2000);
    }
    else if (name == "houses") {
      this.preHouse = data;
      setTimeout(()=> {
      this.house = this.getDetails(this.preHouse);
      this.spinnerService.hide();
      },2000);

    }

  }

  //check null value
  public checkValue = (value): boolean => {
    if (value.length != 0 && value[0] !== "") {
      return true;
    }
    else {
      return false;
    }

  }

  //* *  //method to get all details of string url which is in arrays in property 
  public getDetails = (mydata): any => {

    for (let i in mydata) {
      if (this.checkValue(mydata[i])) {
        if (typeof (mydata[i]) == "string" && mydata[i].search('https') > -1) {

          this.series.getSingleDetail(mydata[i]).subscribe(
            data => {

              mydata[i] = data.name;

            },
            error => {
              console.log(error.errorMessage);

            });

        }
        if (Array.isArray(mydata[i]) && mydata[i][0].search('https') > -1) {
          let dataName = [];
          for (let singleUrl of mydata[i]) {
            this.series.getSingleDetail(singleUrl).subscribe(
              data => {

                dataName.push(data.name);

              },
              error => {
                console.log(error.errorMessage);

              });

          }
          mydata[i] = dataName;

        }
      }
    }
    return mydata;

  } //end

  public goBack=():any =>{
    this.location.back();
  }

}
