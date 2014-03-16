var verbConjugation = 
    {
        'avoir': // these are the actual conjugations
        {
            'je' : 'ai',
            'tu' : 'as',
            'il/elle/on' : 'a',
            'nous' : 'avons', 
            'vous' : 'avez',
            'ils/elles' : 'ont',
        },
        'er verbs': // these are only the endings
        {
            'je' : 'e',
            'tu' : 'es',
            'il/elle/on' : 'e',
            'nous' : 'ons', 
            'vous' : 'ez',
            'ils/elles' : 'ent',
        }
    };

// verbConjugation = _.chain(verbConjugation).value();