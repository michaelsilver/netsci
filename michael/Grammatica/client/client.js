function exposeSessionVar(template, varName){
	template[varName] = function(){
		return Session.get(varName);
	};
};
// make a gien webpage element updatable

// pick a random element of an array
function pickRandomFromArray(array){
	return array[Math.floor(Math.random() * array.length)];
}

////////////

// possible cases and numbers
var cases =   ['Nominative', 'Genetive', 'Dative', 'Accusative', 'Ablative']
var numbers = ['Plural', 'Singular'];

var promptedDictEntry;
var promptedNumber;
var promptedCase;

function Prompt(kingdom, species, pPart){
	// pPart are the principle parts
	// species is the declention if a noun, the verb type (1,2,3,3i, etc.) if verb
	this.kingdom = kingdom; // noun or verb
	this.species = species;
	this.pPart = pPart;
}

////////////

// makes these webpage elements updatable
exposeSessionVar(Template.main, 'userCase');
exposeSessionVar(Template.main, 'userNumber');
exposeSessionVar(Template.main, 'userPrompt');
exposeSessionVar(Template.main, 'userCorrect');

////////////

// on webpage load, show a random case, number, and noun

function promptUser(case_, number, dictEntry){
	Session.set('userCase', case_);
	Session.set('userNumber', number);
	Session.set('userPrompt', dictEntry);
}

Meteor.startup(function(){
	promptUser(
		pickRandomFromArray(cases),
		pickRandomFromArray(numbers),
		pickRandomFromArray(quizletSet.terms).term
	);
});

Template.main.events({
	'click #enter':function(){
		handleSubmit(); // make a function for handle submit
	},
	'keypress input': function (evt) {
		Session.set('userCorrect', '');
	    if (evt.which === 13) {
			handleSubmit();
	    }
	}
});

// function getNumber(){
// 	return Session.get('userNumber').toLowerCase();
// }
// function getCase(){
// 	return Session.get('userCase').toLowerCase();
// }
// function getPrompt(){
// 	return Session.get('userPrompt').toLowerCase();
// }


promptedDictEntry = Session.get('userPrompt').toLowerCase();
promptedNumber = Session.get('userNumber').toLowerCase();
promptedCase = Session.get('userCase').toLowerCase();


promptedDictEntry = promptedDictEntry.replace(/[^a-zA-Z0-9-\s]+/g,''); // gets rid of anything but alphaneum,dash,whitespace
promptedDictEntry = promptedDictEntry.replace(/\s+/g,' '); // replaces whitespace with one space

promptedDictEntry = promptedDictEntry.replace(/^\s+/g,'');
promptedDictEntry = promptedDictEntry.replace(/\s+$/g,''); 
// gets rid of possible beginning and end whitespaces


tempPPart = new Array();
tempPPart = promptedDictEntry.split(' '); 
// splits the temp prompt according to spaces

var prompt = new Prompt; // creates promp object in Prompt class
prompt.pPart = tempPPart; // adds the principle parts as an array pPart as a property of prompt
console.log(prompt.pPart);

// check if noun

// check if first declention
// check if second declention
// check if third declention
// check if fourth declention
// check if fifth declention

// if not any of these, check if verb










/////////////////////////////////////////////////////////////////////////
// function handleSubmit(){
// 	var answer = $('#userInput').val().toLowerCase();
	
//     if (checkAnswer(answer, getNumber(), getCase(), getPrompt())) {
//     	console.log('correct');
//         Session.set('userCorrect', 'RIGHT!');
//     } else {
//     	console.log('wrong');
//         Session.set('userCorrect', 'WRONG!');
//     }
// }

// ////////////////

// function checkAnswer(answer, number, case_, prompt){
// 	console.log(answer, number, case_, prompt);
// 	return answer == 'green';
// }

// function getDeclension(prompt) {
//     nounEntry = nounEntry.replace(/,/g,'');
//     nounEntry = nounEntry.replace(/./g,'');
//     nounEntry = nounEntry.replace(/\s/g,' ');
//     nounEntry = nounEntry.replace(/^\s/g,'');
//     nounEntry = nounEntry.replace(/\s$/g,'');
//     nounEntryPPart = new Array();
//     nounEntryPPart = nounEntry.split(' ');
//     prompt = new Prompt
//     prompt.pPart = nounEntryPPart

//     //parses dictionary defintion. Removes commas, and separetes by spaces (split).
// }

// function stem(noun, declension){
// 	//TODO implement
//     if (declension == '1') {
//         return noun.substring(0,noun.lastIndexOf('us'));
//     }
//     // modify for new term format
// };

// function decline(noun, whichCase, whichNumber, declension){
//     if (declension == '1') {
//         return stem(noun, '1') + nounEndings[declension][whichNumber][whichCase];
//     }
//     //TODO implement
// };


// console.log(nounEndings['Nominative']);
// $.ajax({
//     url: 'https://api.quizlet.com/2.0/users/frenchmichel/sets?client_id=BzBNnKHpmx',
//     type: "GET",
//     beforeSend: function(xhr){xhr.setRequestHeader('Content-type', 'text/json')},
//     success: function(data){
//         console.log(data);
//     }
// });


// $.ajax({
//    type: "GET", 
//    dataType: "JSONP",
//    url: 'https://api.quizlet.com/2.0/sets/415?client_id=BzBNnKHpmx',
//    success: function(res){
//        callback(res);
//    }
// });

// function callback(data){
//    console.log("Success! Here's the returned data: ");
//    for (var i = 0; i < data['terms'].length; i++){
//        console.log(data['terms'][i]);
//    }
// }
