module.exports = {
    introduction: {
        welcome: `Vous avez eu la bonne idée de flasher un QR code PassPass de <%=selected_prm%>. PassPass a
        été créé dans l’objectif d’aider les personnes à mobilité réduite pour leur faciliter
        ponctuellement le quotidien en les mettant en relation avec des personnes qui
        habitent à proximité de son domicile. <%=scannedUser.telegramName%> a collé ce sticker ici pour que vous vous y
        inscriviez ! Bien entendu, plusieurs personnes peuvent s’inscrire au PassPass de
        <%=scannedUser.telegramName%>, c’est même le but ! Dès qu’une personne répondra positivement à la demande
        de <%=scannedUser.telegramName%>, l’ensemble des autres personnes inscrites sur le PassPass de <%=scannedUser.telegramName%> sera
        prévenu`,
        disclaimer: `En aucun cas, l’objectif de PassPass est de se substituer aux auxiliaires et/ou aux
        aidants de la personne PMR.
        PassPass se dégage de toute responsabilité envers les interventions des personnes
        qu’elle met en relation
        Il sera possible à tout instant de ce désinscrire de PassPass`,
        samples: `Les besoins du demandeur peuvent être par exemple :
        - A : ouvrir une porte
        - B : récupérer un objet tombé
        - C : faire de manière exceptionnelle une course
        - D : être rapidement présent en cas de problème avant l’intervention des
        soignants ou des secours`,
        qrcodeNonAvailable: `I'm sorry but it seems that the qrcode you've scanned does not belongs to anyone anynore :/ Maybe its user does not use PassPass anymore.`,
        notAPrm: `Ok, I think you've now understood my purpose, so don't hesitate to spread the word ;) Don't forget, my services are free, my code is opensource (available here: https://github.com/RomeHein/PassPass) and I do respect my users data.`
    },
    signIn: {
        neighborDensity: `Before starting, PassPass heavily rely on mutual aid. This is why it's important for you to live in a city or town with a lot of neighbors in direct proximity of your home.`,
        notDenseNeighborhood: `Je suis navré, mais PassPass fonctionne mieux avec une grande densité de personne autour de vous. Nous pouvons toujours continuer le processus, mais je ne suis pas certain de pouvoir être une grande aide!`,
        mailAddress: `J'aurais besoin de votre address physique. Cela pour deux raisons: 
        - Lorsque quelqu'un scannera votre QRCode je serait en mesure de savoir si il n'est pas trop loin de chez vous
        - Si vous souhaitez que je vous imprime votre sticker personnalisé avec votre QRCode, je pourrais l'envoyer directement chez vous
        Il vous ait tout à fait possible de passer cette question ou de supprimer vos données plustard.
        `
    },
    address: {
        country: `Dans quelle pays habitez vous?`,
        city: `Dans quelle ville habitez vous?`,
        mail: `Quelle est votre adresse? Essayez d'être le plus complet possible ;)`,
    },
    keyboard: {
        introduction: {
            continue:`Very well, what's next?`,
            notAPrm:`All good, but I'm not a person with reduced mobility...`,
        },
        signIn: {
            neighborDensity: {
                dense: `Yes that's the case`,
                notDense: `Nop... not my case`
            },
            mailAddress: {
                ok: `ok`,
                pass: `I'll pass, knowing that I can always set it later on`
            }
        }
    }
}