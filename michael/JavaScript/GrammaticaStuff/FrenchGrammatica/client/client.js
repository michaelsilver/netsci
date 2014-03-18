function exposeSessionVar(template, varName){
	template[varName] = function(){
		return Session.get(varName);
	};
}
// make a gien webpage element updatable

// pick a random element of an array
function pickRandomFromArray(array){
	return array[Math.floor(Math.random() * array.length)];
}

var pronouns =   ['je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles'];
var typeOfPromptedVerb; // the type of verb prompted

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

function promptUser(){
	$('#userInput').val('');
	Session.set('theActualAnswer', '');
	Session.set('userCorrect', '');
	// clears everything but the prompts
	setPrompts(
		pickRandomFromArray(pronouns),
		pickVerb()
	);
}

function pickVerb(){ // eventually accept choices
	var verbTypes = _.keys(verbs);
	typeOfPromptedVerb = pickRandomFromArray(verbTypes);

	return pickRandomFromArray(verbs[typeOfPromptedVerb]);
}

Meteor.startup(function(){
	promptUser();
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
	answer = answer.replace(/\s+/g, ' ');
	answer = answer.replace(/^\s*/, '');
	answer = answer.replace(/\s*$/, '');
	if (answer == (correctAnswer(getPronoun(), getVerb()))) {
		promptUser();
	} else {
		Session.set('userCorrect', 'WRONG!');
		Session.set('theActualAnswer', correctAnswer(getPronoun(), getVerb()));
	}
}

function correctAnswer(pronoun, verb){
	var stem;
	if (typeOfPromptedVerb == 'irregular'){
		stem = '';
	} else {
		stem = verb.slice(0, verb.lastIndexOf(typeOfPromptedVerb));
		verb = typeOfPromptedVerb;
	}

	if (pronoun == 'je' && firstLetterIsVowel(getVerb())){
		return "j'" + stem + verbConjugation[verb][pronoun];
	} else if (pronoun == 'il' || pronoun == 'elle' || pronoun == 'on'){
		return pronoun + ' ' + stem + verbConjugation[verb]['il/elle/on'];
	} else if (pronoun == 'ils' || pronoun == 'elles'){
		return pronoun + ' ' + stem + verbConjugation[verb]['ils/elles'];
	} else return pronoun + ' ' + stem + verbConjugation[verb][pronoun];
}

// UTILITIES:

// function endsWith(base, ending){
//     if(base.length >= ending.length){
//         return base.lastIndexOf(ending) == base.length - ending.length;
//     }else{
//         return false;
//     }
// }

function firstLetterIsVowel(word){
	return (/[aeiou]/).test(word.charAt(0));
}