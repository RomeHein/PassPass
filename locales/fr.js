module.exports = {
    introduction: {
      welcome: {
        helper: `Vous avez eu la bonne idée de flasher un QR code PassPass de <%=scannedUser.telegramName%>. PassPass a été créé dans l’objectif d’aider les personnes à mobilité réduite pour leur faciliter ponctuellement le quotidien en les mettant en relation avec des personnes qui habitent à proximité de son domicile. <%=scannedUser.telegramName%> a collé ce sticker ici pour que vous vous y inscriviez ! 
        Bien entendu, plusieurs personnes peuvent s’inscrire au PassPass de <%=scannedUser.telegramName%>, c’est même le but ! 
        Dès qu’une personne répondra positivement à la demande de <%=scannedUser.telegramName%>, l’ensemble des autres personnes inscrites sur le PassPass de <%=scannedUser.telegramName%> sera prévenu`,
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
      qrcodeNonAvailable: `Je suis désolé mais il semblerait que le Qrcode que vous venez de scanner n'appartient plus à personne :/ Il se peut que son ancien propriètaire ait déménagé ou se soit désinscrit de PassPass...`,
      notAPrm: `Ok, je pense que tu vois maintenant ce que je peux faire, alors n'hésite pas à en parler à des personnes qui pourraient en avoir besoin! N'oublie pas, ce service est gratuit, son code est opensource (disponible ici: https://github.com/RomeHein/PassPass) et il respecte les données personnelles de ses utilisateurs.`,
      alreadySignedIn: `?! Mais je vous connez vous! Oui vous êtes <%=user.telegramName%> ;)`,
      prmHelper: `Pour le moment je limite l'entraide entre personne à mobilité réduite et personne mobile. Donc je peux pas vous ajouter à la liste des aidants pour <%=scannedUser.telegramName%>`
    },
    signIn: {
        neighborDensity: `Avant de commencer, PassPass se base fortement sur l'entreaide. Pour faciliter cela, il est nécessaire que vous vous trouviez au moins dans une ville ou village avec beaucoup de voisins à proximité directe de votre habitation.`,
        notDenseNeighborhood: `Je suis navré, mais PassPass fonctionne mieux avec une grande densité de personne autour de vous. Nous pouvons toujours continuer le processus, mais je ne suis pas certain de pouvoir être une grande aide!`,
        mailAddress: `A présent j'aurais besoin de votre address physique. Cela pour deux raisons: 
        - Lorsque quelqu'un scannera votre QRCode je serait en mesure de savoir si il n'est pas trop loin de chez vous
        - Si vous souhaitez que je vous imprime votre sticker personnalisé avec votre QRCode, je pourrais l'envoyer directement chez vous
        Il vous ait tout à fait possible de passer cette question ou de supprimer vos données plustard.
        `,
        taskList: `Les aidants pourront vous assister à quatre taches diffèrentes pour le moment. Dites moi celles pour les quelles vous aimeriez de l'assistance.
        - A : ouvrir une porte,
        - B : récupérer un objet tombé,
        - C : faire de manière exceptionnelle une course,
        - D : être rapidement présent en cas de problème avant l’intervention des soignants ou des secours`,
        noSelectedTasks: `Vous n'avez plus de tâches sélectionnées.`,
        selectedTasks: `Vous avez selectionné les tâches suivantes:
        <%=selectedTasksString%>`,
        accountCreation: `J'ai tout ce qu'il me faut pour créer votre compte. Ca devrait prendre quelques secondes...
        J'en profite pour vous dire que vous pouvez vous désinscrire à tout moment via la commande /quit. En faisant ainsi, je supprime immédiatement toutes vos informations de ma base de donnée. 
        Vous pouvez également vérifier à tout moment les informations que je stock à votre propos via la commande /info. Je vous renverrai l'exacte copie de ce que contient ma base de donnée.`
    },
    task: {
        openDoor: `ouvrir une porte`,
        grabStuff: `récupérer un objet tombé`,
        makeACourse: `faire de manière exceptionnelle une course`,
        emergency: `être rapidement présent en cas de problème avant l’intervention des soignants ou des secours`
    },
    address: {
        country: `Dans quelle pays habitez vous?`,
        city: `Dans quelle ville habitez vous?`,
        mail: `Quelle est votre adresse? Essayez d'être le plus complet possible ;)`,
        done: `Ok, j'ai enregistré votre nouvelle adresse.`
    },
    keyboard: {
        introduction: {
            continue:`Très bien, c'est quoi la suite?`,
            notAPrm:`Ok mais je ne suis pas une personne à mobilité réduite...`,
        },
        termsAndConditions: {
            agree: `J'ai lu, compris et suis d'accord avec les conditions d'utilisation de PassPass`,
            notAgree: `Pas d'accord`
        },
        signIn: {
            neighborDensity: {
                dense: `Oui c'est le cas`,
                notDense: `Non c'est pas le cas`
            },
            mailAddress: {
                ok: `ok`,
                pass: `Je passe pour cette fois`
            },
            addTask1: `A : ouvrir une porte`,
            addTask2: `B : récupérer un objet tombé`,
            addTask3: `C : faire de manière exceptionnelle une course`,
            addTask4: `D : être rapidement présent`,
            removeTask1: `retirer A`,
            removeTask2: `retirer B`,
            removeTask3: `retirer C`,
            removeTask4: `retirer D`,
            taskSelectionOver: `J'ai terminé!`
        }
    }
  }