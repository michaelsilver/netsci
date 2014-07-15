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

function pickRandomNounVerbFromArray(set){
    prompt = pickRandomFromArray(set.terms).term;
    // console.log(typeof getDeclension(prompt));
    if (getDeclension(prompt) === undefined){
        return pickRandomNounVerbFromArray(set);
    } else return prompt;
}

////////////

// possible cases and numbers
var cases =   ['Nominative', 'Genitive', 'Dative', 'Accusative', 'Ablative'];
var numbers = ['Plural', 'Singular'];

var promptedDictEntry;
var promptedNumber;
var promptedCase;

// function Prompt(kingdom, species, pPart){
// pPart are the principle parts
// species is the declention if a noun, the verb type (1,2,3,3i, etc.) if verb
// this.kingdom = kingdom; // noun or verb
// this.species = species;
// this.pPart = pPart;
// }

////////////

// makes these webpage elements updatable
exposeSessionVar(Template.main, 'userCase');
exposeSessionVar(Template.main, 'userNumber');
exposeSessionVar(Template.main, 'userPrompt');
exposeSessionVar(Template.main, 'userCorrect');
exposeSessionVar(Template.main, 'theActualAnswer');

////////////

// on webpage load, show a random case, number, and noun

function setPrompts(case_, number, dictEntry){
    Session.set('userCase', case_);
    Session.set('userNumber', number);
    Session.set('userPrompt', dictEntry);
}
function promptUser(){
    setPrompts(
        pickRandomFromArray(cases),
        pickRandomFromArray(numbers),
        pickRandomNounVerbFromArray(quizletSet)
    );
}

Meteor.startup(function(){
    promptUser();
    // console.log(getDeclension(getPrompt()));
    // console.log(quizletSet.terms);
    // console.log(findIndexOfThatHas(quizletSet.terms, heu));
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

function getNumber(){
    return Session.get('userNumber').toLowerCase();
}
function getCase(){
    return Session.get('userCase').toLowerCase();
}
function getPrompt(){
    return Session.get('userPrompt').toLowerCase();
}

// Meteor.startup(function(){
//  correctAnswer('philosophus', 'singular', 'nominative', 'philosophus, -i m.');
// });

 
/////////////////////////////////////////////////////////////////////////
function handleSubmit(){
    var answer = $('#userInput').val().toLowerCase();
    
    if (answer == correctAnswer(getCase(), getNumber(), getPrompt())){
        // console.log('correct');
        Session.set('userCorrect', 'RIGHT!');
        $('#userInput').val(''); // hoping this clears the text area. What is the proper way to clear the text area?
        promptUser();
        Session.set('theActualAnswer', '');
        Session.set('userCorrect', '');
    } else {
        // console.log('wrong');
        Session.set('userCorrect', 'WRONG!');
        Session.set('theActualAnswer', correctAnswer(getCase(), getNumber(), getPrompt()));
    }
}

// ////////////////

//test if answer is correct number/case declension of prompt
function correctAnswer(case_, number, prompt){
    var declension = toString(getDeclension(prompt));
    console.log(typeof declension);
    console.log(nominativeSingularsByDeclention);
    prompt = prompt.slice(0, indexOf(nominativeSingularsByDeclention.declension));
    console.log(prompt);

    return 'green'; // sanity test
}

function normalizeDictEntry(dictEntry){
    dictEntry = dictEntry.replace(/[^a-zA-Z0-9-\s]+/g,''); // gets rid of anything but alphaneum,dash,whitespace
    dictEntry = dictEntry.replace(/\s+/g,' '); // replaces whitespace with one space

    dictEntry = dictEntry.replace(/^\s+/g,'');
    dictEntry = dictEntry.replace(/\s+$/g,'');
    return dictEntry.split(' ');
}

function getDeclension(dictEntry) {
    dictEntry = normalizeDictEntry(dictEntry);
    // console.log(dictEntry);
    var ret;
    _.each(_.keys(declensionByGenitiveSingulars), function(key, value){
        if(endsWith(dictEntry[1], key)){
            ret = value;
        }
    });
    if(ret){
        return ret + 1;
    }else{
        console.log('unknown 2nd pp in: ' + dictEntry);
        // quizletSet.terms = _.without(quizletSet.terms, quizletSet.terms[findIndexOfThatHas(quizletSet.terms, dictEntry)])
        // promptUser();
        return;
    }
}

// function findIndexOfThatHas(array, key){
//  for(i=0; array.length; i++){
//      if(_.has(array[i], key))
//          return i;
//  }
// }

function endsWith(base, ending){
    if(base.length >= ending.length){
        return base.lastIndexOf(ending) == base.length - ending.length;
    }else{
        return false;
    }
}
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
//  //TODO implement
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
