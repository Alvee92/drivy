'use strict';

//list of cars
//useful for ALL exercises
var price;
function diffdate(d1,d2){
var div=1000*60*60*24;

 
var Diff = d2.getTime() - d1.getTime();
return Math.ceil((Diff/div))
}
function Price(rent,car)
{
	var i ;
	var j =0;
	var PriceCarDay;
	var PriceCarKm;
	var price;
	
	for(i= 0; i<rent.length; i++)
	{
		for(j = 0; j< car.length; j++)
		{
			
			if(rent[i].carId == car[j].id)
			{
				PriceCarDay = car[j].pricePerDay;
				PriceCarKm = car[j].pricePerKm;
				if(rent[i].options.deductibleReduction){
				PriceCarDay += 4; //if the user subscribed
				}
				console.log(PriceCarDay);
			}
		}
		var RDate = new Date(rent[i].returnDate);
		var PDate = new Date(rent[i].pickupDate);
		
		var percent; // compute of the percentage
		
			if (diffdate(PDate,RDate)+1<4)
			percent=0.9;
 			
			if (diffdate(PDate,RDate)+1<10)
			percent = 0.7;
			 
			if(diffdate(PDate,RDate)+1>10)
			percent = 0.5;
			 
		rent[i].price = ((diffdate(PDate,RDate)+1)*PriceCarDay* percent + rent[i].distance * PriceCarKm) ;
		
		var valuecommission = rent[i].price * 0.3;
		var commission = rent[i].commission;
		commission.insurance = valuecommission *0.5;
		commission.assistance = (diffdate(PDate,RDate)+1);
		commission.drivy = valuecommission -commission.insurance - commission.assistance;
		
	}
}


var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

Price(rentals, cars);
console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
