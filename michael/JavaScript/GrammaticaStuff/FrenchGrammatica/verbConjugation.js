verbConjugation =
    {
        'avoir': // these are the actual conjugations
        {
            'je'         : 'ai',
            'tu'         : 'as',
            'il/elle/on' : 'a',
            'nous'       : 'avons',
            'vous'       : 'avez',
            'ils/elles'  : 'ont',
        },
        '\352tre': // \352 = ê, so être // these are the actual conjugations
        {
            'je'         : 'suis',
            'tu'         : 'es',
            'il/elle/on' : 'est',
            'nous'       : 'sommes',
            'vous'       : '\352tes', // \352 = ê, so êtes 
            'ils/elles'  : 'sont',
        },
        'er': // these are only the endings
        {
            'je'         : 'e',
            'tu'         : 'es',
            'il/elle/on' : 'e',
            'nous'       : 'ons',
            'vous'       : 'ez',
            'ils/elles'  : 'ent',
        },
        're': // these are only the endings
        {
            'je'         : 's',
            'tu'         : 's',
            'il/elle/on' : '',
            'nous'       : 'ons',
            'vous'       : 'ez',
            'ils/elles'  : 'ent',
        },
        'ger': // these are only the endings
        {
            'je'         : 'ge',
            'tu'         : 'ges',
            'il/elle/on' : 'ge',
            'nous'       : 'geons',
            'vous'       : 'gez',
            'ils/elles'  : 'gent',
        },
        'cer': // these are only the endings
        {
            'je'         : 'ce',
            'tu'         : 'ces',
            'il/elle/on' : 'ce',
            'nous'       : '\347ons', // \347 = ç, so çons
            'vous'       : 'cez',
            'ils/elles'  : 'cent',
        },
        '\351AccentChangingEr': // these are the accent changes on the last e before -er
        {
            'je'         : '\350', // è
            'tu'         : '\350', // è
            'il/elle/on' : '\350', // è
            'nous'       : '\351', // é // QUESTION: can value be function?
            'vous'       : '\351', // é
            'ils/elles'  : '\350', // è
        },
        'eAccentChangingEr':
        {
            'je'         : '\350', // è
            'tu'         : '\350', // è
            'il/elle/on' : '\350', // è
            'nous'       : 'e',
            'vous'       : 'e',
            'ils/elles'  : '\350', // è
        }
    };

// verbConjugation = _.chain(verbConjugation).value();
// console.log(_.keys(verbConjugation).verb.value().keys().pronoun));
// console.log(_.keys(verbConjugation.value()));
// console.log(verbConjugation.avoir.tu); // this one is fine

// BUT: look at line 53 of client.js


// function verbConjugation(){
//     return verbConjugation;
// }