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

var pronouns =   ["je (j')", 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles']
var verbs = ['avoir']

// makes these webpage elements updatable
exposeSessionVar(Template.main, 'userPronoun');
exposeSessionVar(Template.main, 'userVerb');
exposeSessionVar(Template.main, 'userCorrect');


// on webpage load, show a random case, number, and noun
function promptUser(pronoun, verb){
	Session.set('userPronoun', pronoun);
	Session.set('userVerb', verb);
}

Meteor.startup(function(){
	promptUser(
		pickRandomFromArray(pronouns),
		pickRandomFromArray(verbs)
	);

	console.log(verbConjugation['avoir']['tu']);  
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

function getPronoun(){
	return Session.get('userPronoun').toLowerCase();
}
function getVerb(){
	return Session.get('userVerb').toLowerCase();
}

function handleSubmit(){
	var answer = $('#userInput').val().toLowerCase();
	
    if (checkAnswer(answer, getPronoun(), getVerb())) {
        Session.set('userCorrect', 'RIGHT!');
    } else {
        Session.set('userCorrect', 'WRONG!');
    }
}

// function checkAnswer(answer, pronoun, verb){
// 	return ;
// }