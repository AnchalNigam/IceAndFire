import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: Array<object>, args: string[]): any {
    if (array == null) {
      return null;
    }


    if (args[1] == "Select" && args[2].length == 0) {
      let finalData = sorting(array);
      return finalData;
    }
    //next conditon

    if (args[1] != "Select" && args[2].length == 0) {

      let newArray = array.filter((val) => {
        return val['url'].search(args[1]) > -1;
      });
      let finalData = sorting(newArray);
      return finalData;

    } ///end

    //next condition
    if (args[1] == "Select" && args[2].length != 0) {
      let newArray = array.filter((val) => {
        let A = val['name'].toLowerCase();
        let B = args[2].toLowerCase();
        return A.search(B) > -1;
      });

      let finalData = sorting(newArray);
      return finalData;

    }//end

    //net condition if both text field and select(boks,character,house) is selected
    if (args[1] != "Select" && args[2].length != 0) {
      let newArray = array.filter((val) => {
        let A = val['name'].toLowerCase();
        let B = args[2].toLowerCase();
        return val['url'].search(args[1]) > -1 && A.search(B) > -1;
      });

      let finalData = sorting(newArray);
      return finalData;


    }
    //Function for sorting in ascending and descending order
    function sorting(myArray): any {
      if (args[0] == "ascending") {
        myArray.sort((a: any, b: any) => {

          let A = a['name'].toLowerCase();
          let B = b['name'].toLowerCase();
          return (A < B) ? -1 : (A > B) ? 1 : 0;
        });
        return myArray;
      }
      if (args[0] == "descending") {
        myArray.sort((a: any, b: any) => {

          let A = a['name'].toLowerCase();
          let B = b['name'].toLowerCase();
          return (A > B) ? -1 : (A < B) ? 1 : 0;
        });
        return myArray;
      }

    }//end

  }

}
