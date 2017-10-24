
//FreeCodeCamp Advanced Algorithm Scripting


/* Validate US Telephone Numbers

Return true if the passed string is a valid US phone number.

The user may fill out the form field any way they choose as long as it is a valid US number. The following are examples of valid formats for US numbers (refer to the tests below for other variants):

555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555
For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. Your job is to validate or reject the US phone number based on any combination of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone number; otherwise return false.

RegExp */

function telephoneCheck(str) {
    // Good luck!
    var regex = /^1?\s?(\d{3}|\(\d{3}\))(\s?|-)(\d{3})(\s?|-)(\d{4})$/;

    return regex.test(str);
}

telephoneCheck("555-555-5555");
telephoneCheck("1 555)555-5555");
telephoneCheck("1 (555) 555-5555");



/* Record Collection

You are given a JSON object representing a part of your musical album collection. Each album has several properties and a unique id number as its key. Not all albums have complete information.

Write a function which takes an album's id (like 2548), a property prop (like "artist" or "tracks"), and a value (like "Addicted to Love") to modify the data in this collection.

If prop isn't "tracks" and value isn't empty (""), update or set the value for that record album's property.

Your function must always return the entire collection object.

There are several rules for handling incomplete data:

If prop is "tracks" but the album doesn't have a "tracks" property, create an empty array before adding the new value to the album's corresponding property.

If prop is "tracks" and value isn't empty (""), push the value onto the end of the album's existing tracks array.

If value is empty (""), delete the given prop property from the album.

Hints
Use bracket notation when accessing object properties with variables.

Push is an array method you can read about on Mozilla Developer Network.

You may refer back to Manipulating Complex Objects Introducing JavaScript Object Notation (JSON) for a refresher. */

// Setup
var collection = {
    "2548": {
        "album": "Slippery When Wet",
        "artist": "Bon Jovi",
        "tracks": [
            "Let It Rock",
            "You Give Love a Bad Name"
        ]
    },
    "2468": {
        "album": "1999",
        "artist": "Prince",
        "tracks": [
            "1999",
            "Little Red Corvette"
        ]
    },
    "1245": {
        "artist": "Robert Palmer",
        "tracks": []
    },
    "5439": {
        "album": "ABBA Gold"
    }
};
// Keep a copy of the collection for tests
var collection = {
    "2548": {
        "album": "Slippery When Wet",
        "artist": "Bon Jovi",
        "tracks": [
            "Let It Rock",
            "You Give Love a Bad Name"
        ]
    },
    "2468": {
        "album": "1999",
        "artist": "Prince",
        "tracks": [
            "1999",
            "Little Red Corvette"
        ]
    },
    "1245": {
        "artist": "Robert Palmer",
        "tracks": []
    },
    "5439": {
        "album": "ABBA Gold"
    }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

// Only change code below this line
function updateRecords(id, prop, value) {

    if (value == "") {
        delete collection[id][prop];
    } else if (prop == "tracks") {
        if (collectionCopy[id].hasOwnProperty(prop)) {
            collectionCopy[id][prop].push(value);
        } else {
            collectionCopy[id][prop] = [];
            collectionCopy[id][prop].push(value);
        }
    } else {
        collectionCopy[id][prop] = value;
    }

    return collectionCopy;
}

// Alter values below to test your code
updateRecords(5439, "artist", "ABBA");
updateRecords(5439, "tracks", "Take a Chance on Me");
updateRecords(2468, "tracks", "");
updateRecords(1245, "tracks", "Addicted to Love");



/* Symmetric Difference

Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays.

Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the mathematical term "symmetric difference" of two sets is the set of elements which are in either of the two sets, but not in both (A △ B = C = {1, 4}). For every additional symmetric difference you take (say on a set D = {2, 3}), you should get the set with elements which are in either of the two the sets but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).

Array.prototype.reduce()
Symmetric Difference */

function sym(args) {
    var arg = Array.prototype.slice.call(arguments);

    return arg.reduce(function (a, b, index) {

        var arr1Filtered = a.filter(function (value) {
            return b.indexOf(value) === -1;
        });

        var arr2Filtered = b.filter(function (value) {
            return a.indexOf(value) === -1;
        });

        return arr1Filtered.concat(arr2Filtered).filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        });

    });

}

sym([1, 2, 3], [5, 2, 1, 4]);
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]);
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]);



/* Exact Change

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. Return the string "Closed" if cash-in-drawer is equal to the change due.

Otherwise, return change in coin and bills, sorted in highest to lowest order.

Global Object */


function checkCashRegister(price, cash, cid) {
    var change;
    // Here is your change, ma'am.
    var currency = cash - price;
    var total = 0;

    var value = ["ONE HUNDRED", "TWENTY", "TEN", "FIVE", "ONE", "QUARTER", "DIME", "NICKEL", "PENNY"],
        coinAndBills = [100, 20, 10, 5, 1, 0.25, 0.10, 0.05, 0.01],
        newArr = [],
        money = [];


    for (var i = cid.length - 1; i >= 0; i--) {
        newArr.push(cid[i][1]);
    }


    newArr.map(function (number, i) {
        var lap = 0,
            name,
            sum = 0;

        while (currency >= coinAndBills[i] && number > 0) {

            lap += 1;
            name = value[i];
            sum = coinAndBills[i] * lap;
            currency -= coinAndBills[i];
            currency = Math.round(currency * 100) / 100;
            number -= coinAndBills[i];

        }

        if (name !== undefined && sum > currency) {
            money.push([name, sum]);
        }

        total = Math.round(((total += number) * 100) / 100);

    });


    if (total < currency || money == 0) {
        change = "Insufficient Funds";
    } else if (total == currency) {
        change = "Closed";
    } else {
        return money;
    }

    return change;

}


// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);



/* Inventory Update

Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery. Update the current existing inventory item quantities (in arr1). If an item cannot be found, add the new item and quantity into the inventory array. The returned inventory array should be in alphabetical order by item.

Global Array Object */

function updateInventory(arr1, arr2) {
    // All inventory must be accounted for or you're fired!

    for (var i = 0; i < arr2.length; i++) {
        for (var j = 0; j < arr1.length; j++) {
            if (arr1[j][1].indexOf(arr2[i][1]) >= 0) {
                arr1[j][0] += arr2[i][0];
                arr2[i][0] = "add";
            }
        }
    }

    return arr1.concat(arr2).filter(function (item, pos, self) {
        return item[0] !== "add";
    }).sort(function (a, b) {
        var nameA = a[1],
            nameB = b[1];

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

    });

}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);



/* No repeats please

Return the number of total permutations of the provided string that don't have repeated consecutive letters. Assume that all characters in the provided string are each unique.

For example, aab should return 2 because it has 6 total permutations (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating.

Permutations
RegExp */

function permAlone(str) {
    
      var perm = function(str) {
        var arr = [];
      
        if (str.length === 1) {
          arr.push(str);
          return arr;
        }
      
        for (var i = 0; i < str.length; i++) {
          var firstChar = str[i];
          var rest = str.substring(0, i) + str.substring(i + 1);
          var permutations = perm(rest);
          for (var j = 0; j < permutations.length; j++) {
            arr.push(firstChar + permutations[j]);
          }
        }
      
        return arr;
      };
    
      var arr = perm(str);
    
      var regex = /(.)\1+/g;
   
      var filtered = arr.filter(function(el) {
        return !el.match(regex);
      });
  
      return filtered.length;
  
  }
  
  permAlone('aab');
  


/* Make a Person

Fill in the object constructor with the following methods below:

getFirstName()
getLastName()
getFullName()
setFirstName(first)
setLastName(last)
setFullName(firstAndLast)
Run the tests to see the expected output for each method.

The methods that take an argument must accept only one argument and it has to be a string.

These methods must be the only available means of interacting with the object.

Closures
Details of the Object Model */

var Person = function(firstAndLast) {
    // Complete the method below and implement the others similarly
    var firstName,
        lastName;
  
    this.setFullName = function(firstAndLast) {
        firstAndLast = firstAndLast.split(" ");
        firstName = firstAndLast[0];
        lastName = firstAndLast[1];
    };
  
    this.setFirstName = function(first) {
      firstName = first;
    };
  
    this.setLastName = function(last) {
      lastName = last;
    };
  
    this.getFullName = function() {
      return firstName + " " + lastName;
    };
  
    this.getFirstName = function() {
      return firstName;
    };
  
    this.getLastName = function() {
      return lastName;
    };
  
    this.setFullName(firstAndLast);
 
};

var bob = new Person('Bob Ross');
bob.getFullName();
bob.setFullName("Haskell Curry");
bob.getFullName();



/* Map the Debris

Return a new array that transforms the element's average altitude into their orbital periods.

The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.

You can read about orbital periods on wikipedia.

The values should be rounded to the nearest whole number. The body being orbited is Earth.

The radius of the earth is 6367.4447 kilometers, and the GM value of earth is 398600.4418 km3s-2.

Math.pow() */

function orbitalPeriod(arr) {
    var GM = 398600.4418;
    var earthRadius = 6367.4447;
    
    arr.map(function(element) {
      
      var p = 2 * Math.PI * Math.sqrt(Math.pow(earthRadius + element.avgAlt, 3) / GM);
      
      delete element.avgAlt;
      
      return element.name, element.orbitalPeriod = Math.round(p);
      
    });
    
    return arr;
  
  }
  
orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);
orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]);



/* Pairwise

Given an array arr, find element pairs whose sum equal the second argument arg and return the sum of their indices.

If multiple pairs are possible that have the same numeric elements but different indices, return the smallest sum of indices. Once an element has been used, it cannot be reused to pair with another.

For example pairwise([7, 9, 11, 13, 15], 20) returns 6. The pairs that sum to 20 are [7, 13] and [9, 11]. We can then write out the array with their indices and values.

Index	0	1	2	3	4
Value	7	9	11	13	15
Below we'll take their corresponding indices and add them.

7 + 13 = 20 → Indices 0 + 3 = 3
9 + 11 = 20 → Indices 1 + 2 = 3
3 + 3 = 6 → Return 6

Array.prototype.reduce() */

function pairwise(arr, arg) {
    
    if(arr.length == 0) {
      return 0;
    }
  
    var result = [];
   
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (i !== j && arr[i] + arr[j] === arg && result.indexOf(i) == -1 && result.indexOf(j) == -1) {
                result.push(i, j);
            }
        }
    }
   
    return result.reduce(function(a, b) {
        return a + b;
    });
    
}
  
pairwise([1,4,2,3,0,5], 7);
    
