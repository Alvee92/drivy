'use strict';

//list of cars
//useful for ALL exercises
function diffdate(d1,d2){ //compute the number of days between two dates
var div=1000*60*60*24;

var Diff = d2.getTime() - d1.getTime();

return Math.ceil((Diff/div)) +1
}


function GetCar(rentalCarId, cars) //This function allows to get the associated car, given a rental id
{
	for(var car of cars)
	{ 
		if (rentalCarId == car.id)
		{
			return car;
		}
	}
}

function GetRental(rentalId, rentals) //This function allows to get the associated rental, given a rental id (it is used for the rental modification)
{
	for(var rental of rentals) //here we get all the rental in the array 'rentals'
	{ 
		if (rentalId == rental.id) //then compare the both id (the given id in the parameters of the function, and the id of the rental in the array)
		{
			return rental;
		}
	}
}

function SetPercentage(NumberDays)// compute of the percentage for the reduction
{
var percent = 1; 
		
			if (NumberDays >1 && NumberDays <= 4) //if the number of days is lower tha 4
			percent = 0.9;
			
			if (NumberDays>4 && NumberDays <= 10) //els if it's lower than 10
			percent=0.7;
			 
			else if (NumberDays>10)
			percent = 0.5;
			
			return percent;
}

function SetActorAmount (rentalId, who, amount, actors) //this function is tricky because 'actor' is an array of objects which contents an array of objects
{
	for (var theActor of actors) //for each instance of the array actors
	{
		if (theActor.rentalId == rentalId) //when we find the correct rentalId
		{
			for( var actorName of theActor.payment) //we search in the payment array to find the correct actor name (owner, drivy etc.)
				{
					if(who == actorName.who)
						{
							actorName.amount = amount; //when we find it, we just set the correct amount
						}
				}
		}
	}
}
function Price(rentals, actors) //Compute the price of the rental.
{
	
	var PriceCarDay = 0; //Get the pricePerDay of the current car
	var PriceCarim = 0;  //Get the pricePerim of the current car
	
	
	for(var rent of rentals)
	{
		var car = GetCar(rent.carId, cars); //get the associated car
		
		PriceCarDay = car.pricePerDay; //and the associated prices
		PriceCarim = car.pricePerim;
		
		var NumberDays = diffdate(new Date(rent.piciupDate),new Date(rent.returnDate)) ;
		var deductibleoption = 4 * NumberDays * rent.options.deductibleReduction;  //compute the new price with the deductible option
		//rent.options.deductibleReduction is a boolean (equal to 0 or 1) so we can multiply it directly by the number of days and 4
		//to know the value of deductible option, no need to do an if condition.
	
		rent.price = ((NumberDays)*PriceCarDay* SetPercentage(NumberDays) + rent.distance * PriceCarim) + deductibleoption; //set the final price with the deductible 
		
		var valuecommission = rent.price * 0.3;
		var commission = rent.commission;
		
		commission.insurance = valuecommission *0.5;
		commission.assistance = NumberDays;
		commission.drivy = valuecommission -commission.insurance - commission.assistance + deductibleoption;
		
		SetActorAmount(rent.id, 'driver', rent.price , actors);
		SetActorAmount(rent.id, 'owner', rent.price - valuecommission - deductibleoption , actors);
		SetActorAmount(rent.id, 'insurance', commission.insurance , actors);
		SetActorAmount(rent.id, 'assistance', commission.assistance , actors);
		SetActorAmount(rent.id, 'drivy', commission.drivy , actors);
	}
}

function ChangeRental(rentals, Mrentals) //apply the chegements on the rental array, Mrental is for rentalModification
{
	 for (var Mrental of Mrentals) //first get the modified rentals
		{
			var rental = GetRental(Mrental.rentalId, rentals); //then get the unmodified rentals to apply them the changes
			
			for (var properties in Mrental)
			{
				rental[properties] = Mrental[properties]; //apply changes
			}
		}

}
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerim': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerim': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerim': 0.45
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
  'piciupDate': '2016-01-02',
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
  'piciupDate': '2016-01-05',
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
  'piciupDate': '2015-12-01',
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
  'piciupDate': '2015-12-05'
}];

Price(rentals,actors);

var changeRental = confirm("Press ok to change the rentals and compute the new price");
if (changeRental == true) {
    ChangeRental(rentals, rentalModifications);
	Price(rentals,actors);
} 

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
