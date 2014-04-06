(function(){function exposeSessionVar(template, varName){
	template[varName] = function(){
		return Session.get(varName);
	};
};
function pickRandomFromArray(array){
	return array[Math.floor(Math.random() * array.length)];
}

////////////

var cases =   ['Nominative', 'Genetive', 'Dative', 'Accusative', 'Ablative']
var numbers = ['Plural', 'Singular'];

////////////

exposeSessionVar(Template.main, 'userCase');
exposeSessionVar(Template.main, 'userNumber');
exposeSessionVar(Template.main, 'userPrompt');
exposeSessionVar(Template.main, 'userCorrect');

////////////

Meteor.startup(function(){
	prompt(
		pickRandomFromArray(cases),
		pickRandomFromArray(numbers),
		pickRandomFromArray(nouns)
	);
});

Template.main.events({
	'click #enter':function(){
		handleSubmit();
	},
	'keypress input': function (evt) {
		Session.set('userCorrect', '');
	    if (evt.which === 13) {
			handleSubmit();
	    }
	}
});

function prompt(case_, number, prompt){
	Session.set('userCase', case_);
	Session.set('userNumber', number);
	Session.set('userPrompt', prompt);
}

function getNumber(){
	return Session.get('userNumber').toLowerCase();
}
function getCase(){
	return Session.get('userCase').toLowerCase();
}
function getPrompt(){
	return Session.get('userPrompt').toLowerCase();
}

function handleSubmit(){
	var answer = $('#userInput').val().toLowerCase();
	
    if (checkAnswer(answer, getNumber(), getCase(), getPrompt())) {
    	console.log('correct');
        Session.set('userCorrect', 'RIGHT!');
    } else {
    	console.log('wrong');
        Session.set('userCorrect', 'WRONG!');
    }
}

////////////////

function checkAnswer(answer, number, case_, prompt){
	console.log(answer, number, case_, prompt);
	return answer == 'green';
}

function getDeclension(noun) {
    prompt = prompt.replace(/,/g,'');
    //TODO: parse dictionary defintion. Remove commas, and separete by spaces (split).
}

function stem(noun, declension){
	//TODO implement
    if (declension == '1') {
        return noun.substring(0,noun.lastIndexOf('us'));
    }
    // modify for new term format
};

function decline(noun, whichCase, whichNumber, declension){
    if (declension == '1') {
        return stem(noun, '1') + nounEndings[declension][whichNumber][whichCase];
    }
    //TODO implement
};


// // console.log(nounEndings['Nominative']);
// // $.ajax({
// //     url: 'https://api.quizlet.com/2.0/users/frenchmichel/sets?client_id=BzBNnKHpmx',
// //     type: "GET",
// //     beforeSend: function(xhr){xhr.setRequestHeader('Content-type', 'text/json')},
// //     success: function(data){
// //         console.log(data);
// //     }
// // });


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

})();
