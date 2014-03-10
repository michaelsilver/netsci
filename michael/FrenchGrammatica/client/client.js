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
exposeSessionVar(Template.main, 'theActualAnswer');


// on webpage load, show a random case, number, and noun
function setPrompts(pronoun, verb){
	Session.set('userPronoun', pronoun);
	Session.set('userVerb', verb);
}

function promptUser() {
	setPrompts(
		pickRandomFromArray(pronouns),
		pickRandomFromArray(verbs)
	);
}

Meteor.startup(function(){
	promptUser();
	// console.log(verbConjugation.avoir.tu);
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

function getPronoun(){
	return Session.get('userPronoun').toLowerCase();
}
function getVerb(){
	return Session.get('userVerb').toLowerCase();
}

function handleSubmit(){
	var answer = $('#userInput').val().toLowerCase();
	
    if (answer == correctAnswer(getPronoun(), getVerb())) {
        Session.set('userCorrect', 'RIGHT!');
        $('#userInput').val(''); // hoping this clears the text area. What is the proper way to clear the text area?
        promptUser();
        Session.set('theActualAnswer', '');
        Session.set('userCorrect', '');
    } else {
        Session.set('userCorrect', 'WRONG!');
        Session.set('theActualAnswer', correctAnswer(getPronoun(), getVerb()));
    }
}

function correctAnswer(pronoun, verb){
	if (pronoun == 'je' && firstLetterIsVowel(verbConjugation.verb.pronoun)){
		return "j'" + verbConjugation.verb.pronoun;
	} else if (pronoun == 'il' || pronoun == 'elle' || pronoun == 'on'){
		return pronoun + ' ' + verbConjugation.verb.il/elle/on;
	} else if (pronoun == 'ils' || pronoun == 'elles'){
		return pronoun = ' ' + verbConjugation.verb.ils/elles;
	} else return pronoun + verbConjugation.verb.pronoun;
}

function firstLetterIsVowel(word){
	return word.charAt(0) == /[aeiou]/;
}