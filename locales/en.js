module.exports = {
    introduction: {
        welcome: {
            helper: `Vous avez eu la bonne idée de flasher un QR code PassPass de <%=scannedUser.telegramName%>. PassPass a été créé dans l’objectif d’aider les personnes à mobilité réduite pour leur faciliter ponctuellement le quotidien en les mettant en relation avec des personnes qui habitent à proximité de son domicile. <%=scannedUser.telegramName%> a collé ce sticker ici pour que vous vous y inscriviez ! Bien entendu, plusieurs personnes peuvent s’inscrire au PassPass de <%=scannedUser.telegramName%>, c’est même le but ! Dès qu’une personne répondra positivement à la demande de <%=scannedUser.telegramName%>, l’ensemble des autres personnes inscrites sur le PassPass de <%=scannedUser.telegramName%> sera prévenu`,
            prm: `Bonjour et bienvenu! Je suis PassPassBot! Mon role est de faciliter votre vie en vous mettant en relation avec des personnes qui habitent à proximité de chez vous.`
        },
        disclaimer: {
            helper: `En aucun cas, l’objectif de PassPass est de se substituer aux auxiliaires et/ou aux aidants de la personne PMR.
            PassPass se décharge de toute responsabilité envers les interventions des personnes qu’elle met en relation
            Il sera possible à tout instant de ce désinscrire de PassPass`,
            prm: `En aucun cas, l’objectif de PassPass est de se substituer à vos auxiliaires et/ou à vos aidants.
            PassPass se décharge de toute responsabilité envers les interventions des personnes qu’elle met en relation.
            Il sera possible à tout instant de ce désinscrire de PassPass via la commande /quit`
        },
        samples: `Les besoins du demandeur peuvent être par exemple :
        - A : ouvrir une porte
        - B : récupérer un objet tombé
        - C : faire de manière exceptionnelle une course
        - D : être rapidement présent en cas de problème avant l’intervention des soignants ou des secours`,
        termsAndConditions: `Avant toutes choses, vous devez acceptez les conditions d'utilisation de PassPass. Elles sont disponibles à cette adresse: `,
        termsAndConditionsDenied: `Je comprends, je vous invite à nous poser toutes questions ou intérogations que vous pouvez avoir à ce sujet. Je me chargerai de les remonter aux bonnes personnes ;)`,
        qrcodeNonAvailable: `I'm sorry but it seems that the qrcode you've scanned does not belongs to anyone anynore :/ Maybe its user does not use PassPass anymore.`,
        notAPrm: `Ok, I think you've now understood my purpose, so don't hesitate to spread the word ;) Don't forget, my services are free, my code is opensource (available here: https://github.com/RomeHein/PassPass) and I do respect my users data.`,
        prmHelper: `Pour le moment je limite l'entraide entre personne à mobilité réduite et personne mobile. Donc je peux pas vous ajouter à la liste des aidants pour <%=scannedUser.telegramName%>`,
        alreadySignedIn: `?! Wait a minute! I already know you <%=user.telegramName%> ;)`,
        addNewPrm: `Vous avez eu la bonne idée de flasher un QR code PassPass de <%=scannedUser.telegramName%>. Je vois que vous connaissez déjà le principe de PassPass. Je vais donc utiliser les préférences que vous avez déjà paramétrées.`,
    },
    signIn: {
        neighborDensity: `Before starting, PassPass heavily rely on mutual aid. This is why it's important for you to live in a city or town with a lot of neighbors in direct proximity of your home.`,
        notDenseNeighborhood: `Je suis navré, mais PassPass fonctionne mieux avec une grande densité de personne autour de vous. Nous pouvons toujours continuer le processus, mais je ne suis pas certain de pouvoir être une grande aide!`,
        mailAddress: `J'aurais besoin de votre adresse physique. Cela pour deux raisons: 
        - Lorsque quelqu'un scannera votre QRCode je serait en mesure de savoir si il n'est pas trop loin de chez vous
        - Si vous souhaitez que je vous imprime votre sticker personnalisé avec votre QRCode, je pourrais l'envoyer directement chez vous
        Votre adresse ne sera jamais utilisée ou comuniquée pour autre chose que ces deux raisons.
        Il vous ait tout à fait possible de passer cette question ou de supprimer vos données plustard.
        `,
        accountCreation: `J'ai tout ce qu'il me faut pour créer votre compte. Ca devrait prendre quelques secondes...
        J'en profite pour vous dire que vous pouvez vous désinscrire à tout moment via la commande /quit. En faisant ainsi, je supprime immédiatement toutes vos informations de ma base de donnée. 
        Vous pouvez également vérifier à tout moment les informations que je stock à votre propos via la commande /info. Je vous renverrai l'exacte copie de ce que contient ma base de donnée.`,
        prmAccountCreationDone: `C'est bon, je viens de créer votre compte PassPass!`,
        helperAccountCreationDone: `J'ai crée votre compte et prévenu <%=scannedUser.telegramName%> que vous êtes présent pour l'aider. Merci de votre aide!`,
        livingNearby: `Avant de paramétrer quelques préférences, j'aimerai confirmer avec vous que vous habitez en proximité directe du QRCode que vous venez de scanner. C'est important, car la disponibilité et la facilité d'assistance est un élément clef dans le bon fonctionnement de PassPass!`,
        notLivingNearby: `Je suis navré, mais c'est une chose importante. Mais si vous souhaitez aider, n'hésitez pas à parler de PassPass autour de vous!`
    },
    task: {
        taskListPrm: `Les aidants pourront vous assister à quatre taches diffèrentes pour le moment. Dites moi celles pour les quelles vous aimeriez de l'assistance.
        - A : ouvrir une porte,
        - B : récupérer un objet tombé,
        - C : faire de manière exceptionnelle une course,
        - D : être rapidement présent en cas de problème avant l’intervention des soignants ou des secours`,
        taskListHelper: `Pour le moment il est possible d'assister une personne à mobilité réduite (PRM) pour 4 tâches différentes. Dites moi celles pour les quelles vous souhaiteriez apporter votre aide.
        - A : ouvrir une porte,
        - B : récupérer un objet tombé,
        - C : faire de manière exceptionnelle une course,
        - D : être rapidement présent en cas de problème avant l’intervention des soignants ou des secours`,
        selectedTasks: `You have selected the following tasks:
        <%=selectedTasksString%>`,
        openDoor: `open a door`,
        grabStuff: `récupérer un objet tombé`,
        makeACourse: `faire de manière exceptionnelle une course`,
        emergency: `être rapidement présent en cas de problème avant l’intervention des soignants ou des secours`,
        updated: `All godd, I've saved your new preferences.`
    },
    address: {
        country: `Dans quelle pays habitez vous?`,
        city: `Dans quelle ville habitez vous?`,
        mail: `Quelle est votre adresse? Essayez d'être le plus complet possible ;)`,
        done: `Ok, j'ai enregistré votre nouvelle adresse.`
    },
    qrCode: {
        introduction: `Je vais maintenant créer votre sticker. 
        Ce sticker contiendra un QRCode que vos voisins pourront scanner. 
        Je vous conseil de le mettre à un endroit où il y a du passage, ce qui augmentera les chances qu'une personne scan votre QRCode.`,
        textCustomisation: `Pour rendre votre sticker plus attractif je vous conseil d'y ajouter un petit texte personnalisé.
        Quel texte souhaitez-vous ajouter?`,
        notSignedIn: `Il me semble que vous êtes pas encore inscrit... Commencer par la commande /start et je vous guiderai pas à pas.`
    },
    keyboard: {
        introduction: {
            continue:`Very well, what's next?`,
            notAPrm:`All good, but I'm not a person with reduced mobility...`,
        },
        termsAndConditions: {
            agree: `I've read, understood and agreed with the terms and conditions of PassPass use.`,
            notAgree: `I disagree.`
        },
        signIn: {
            neighborDensity: {
                dense: `Yes that's the case`,
                notDense: `Nop... not my case`
            },
            mailAddress: {
                ok: `ok`,
                pass: `I'll pass, knowing that I can always set it later on`
            },
            livingNearby: {
                true: `Yes that's the case`,
                false: `Not the case`
            }
        },
        task: {
            taskSelectionOver: `I'm done!`,
            addTask1: `A : ouvrir une porte`,
            addTask2: `B : récupérer un objet tombé`,
            addTask3: `C : faire une course (exceptionnelle)`,
            addTask4: `D : être rapidement présent (urgence)`,
            removeTask1: `retirer A`,
            removeTask2: `retirer B`,
            removeTask3: `retirer C`,
            removeTask4: `retirer D`,
        }
    },
    notification: {
        prmHasNewHelper: (helperUser) => `${helperUser.telegramName} just subscribe to assist you! 
        He'll try to help you for the following tasks: ${helperUser.tasks.map((task)=>task.id).join(',')}`
    }
}