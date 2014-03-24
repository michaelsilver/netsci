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

var pronouns =   ['je', 'tu', 'il/elle/on', 'nous', 'vous', 'ils/elles'];
var typeOfPromptedVerb; // the type of verb prompted
var typeOfPromptedPronoun;
// var oldPronoun;
// var oldVerb;
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

	var promptedPronoun = pickPronoun();
	var promptedVerb = pickVerb();
	var oldPronoun;
	var oldVerb;

	if (promptedPronoun === oldPronoun && promptedVerb === oldVerb){
		promptUser();
	} else {
		oldPronoun = promptedPronoun;
		oldVerb = promptedVerb;
	}

	setPrompts(
		promptedPronoun,
		promptedVerb
	);
}

function pickPronoun(){
	typeOfPromptedPronoun = pickRandomFromArray(pronouns);

	if (typeOfPromptedPronoun == 'il/elle/on'){
		return pickRandomFromArray(['il', 'elle', 'on']);
	} else if (typeOfPromptedPronoun == 'ils/elles'){
		return pickRandomFromArray(['ils', 'elles']);
	} else return typeOfPromptedPronoun;
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
	'click #submit':function(){
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
	} else if (typeOfPromptedVerb == '\351AccentChangingEr' || typeOfPromptedVerb == 'eAccentChangingEr'){
		stem = verb.slice(0, verb.lastIndexOf('er'));
		stem = changeEAccent(typeOfPromptedVerb, stem, pronoun);
		verb = 'er';
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

function changeEAccent(type, stem, pronoun){
	return stem.replaceAt(stem.length-2, verbConjugation[type][pronoun]);
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

// function replaceAt(string, index, character){
// return string.substr(0, index) + character + string.substr(index+character.length);
// }


//found online - wondering about "prototype" 
String.prototype.replaceAt=function(index, character){
	return this.substr(0, index) + character + this.substr(index+character.length);
};