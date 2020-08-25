module.exports = {
    introduction: {
      welcome: {
        helper: `Vous avez eu la bonne idée de flasher un QR code PassPass de <%=scannedUser.telegramName%>. PassPass a
        été créé dans l’objectif d’aider les personnes à mobilité réduite pour leur faciliter
        ponctuellement le quotidien en les mettant en relation avec des personnes qui
        habitent à proximité de son domicile. <%=scannedUser.telegramName%> a collé ce sticker ici pour que vous vous y
        inscriviez ! Bien entendu, plusieurs personnes peuvent s’inscrire au PassPass de
        <%=scannedUser.telegramName%>, c’est même le but ! Dès qu’une personne répondra positivement à la demande
        de <%=scannedUser.telegramName%>, l’ensemble des autres personnes inscrites sur le PassPass de <%=scannedUser.telegramName%> sera
        prévenu`,
        pmr: `Bonjour et bienvenu! Je suis PassPassBot! Mon role est de faciliter votre vie en vous mettant en relation avec des personnes qui habitent à proximité de chez vous.`
      },
      disclaimer: `En aucun cas, l’objectif de PassPass est de se substituer aux auxiliaires et/ou aux
      aidants de la personne PMR.
      PassPass se décharge de toute responsabilité envers les interventions des personnes
      qu’elle met en relation
      Il sera possible à tout instant de ce désinscrire de PassPass`,
      samples: `Les besoins du demandeur peuvent être par exemple :
      - A : ouvrir une porte
      - B : récupérer un objet tombé
      - C : faire de manière exceptionnelle une course
      - D : être rapidement présent en cas de problème avant l’intervention des
      soignants ou des secours`,
      qrcodeNonAvailable: `Je suis désolé mais il semblerait que le Qrcode que vous venez de scanner n'appartient plus à personne :/ Il se peut que son ancien propriètaire ait déménagé ou se soit désinscrit de PassPass...`,
      notAPrm: `Ok, je pense que tu vois maintenant ce que je peux faire, alors n'hésite pas à en parler à des personnes qui pourraient en avoir besoin! N'oublie pas, ce service est gratuit, son code est opensource (disponible ici: https://github.com/RomeHein/PassPass) et il respecte les données personnelles de ses utilisateurs.`,
      alreadySignedIn: `?! Mais je vous connez vous! Oui vous êtes <%=user.telegramName%> ;)`
    },
    signIn: {
        neighborDensity: `Avant de commencer, PassPass se base fortement sur l'entreaide. Pour faciliter cela, il est nécessaire que vous vous trouviez au moins dans une ville ou village avec beaucoup de voisins à proximité directe de votre habitation.`,
        notDenseNeighborhood: `Je suis navré, mais PassPass fonctionne mieux avec une grande densité de personne autour de vous. Nous pouvons toujours continuer le processus, mais je ne suis pas certain de pouvoir être une grande aide!`,
        mailAddress: `A présent j'aurais besoin de votre address physique. Cela pour deux raisons: 
        - Lorsque quelqu'un scannera votre QRCode je serait en mesure de savoir si il n'est pas trop loin de chez vous
        - Si vous souhaitez que je vous imprime votre sticker personnalisé avec votre QRCode, je pourrais l'envoyer directement chez vous
        Il vous ait tout à fait possible de passer cette question ou de supprimer vos données plustard.
        `,
        termsAndConditions: `Pour aller plus loin, vous devez acceptez les conditions d'utilisation de PassPass. Elles sont disponibles à cette adresse: `
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
        signIn: {
            neighborDensity: {
                dense: `Oui c'est le cas`,
                notDense: `Non c'est pas le cas`
            },
            mailAddress: {
                ok: `ok`,
                pass: `Je passe pour cette fois`
            },
            termsAndConditions: {
                agree: `J'ai lu, compris et suis d'accord avec les conditions d'utilisation de PassPass`,
                notAgree: `Pas d'accord`
            }
        }
    }
  }