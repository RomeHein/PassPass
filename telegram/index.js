const bb = require('bot-brother');
const bot = bb({
  key: process.env.telegramToken,
  sessionManager: bb.sessionManager.memory(),
  polling: { interval: 0, timeout: 1 }
});

// Setting keys and values for locale 'fr'.
bot.texts({
  introduction: {
    welcome: {
      helper: `Vous avez eu la bonne idée de flasher un QR code PassPass de <%=selected_prm%>. PassPass a
      été créé dans l’objectif d’aider les personnes à mobilité réduite pour leur faciliter
      ponctuellement le quotidien en les mettant en relation avec des personnes qui
      habitent à proximité de son domicile. <%=selected_prm%> a collé ce sticker ici pour que vous vous y
      inscriviez ! Bien entendu, plusieurs personnes peuvent s’inscrire au PassPass de
      <%=selected_prm%>, c’est même le but ! Dès qu’une personne répondra positivement à la demande
      de <%=selected_prm%>, l’ensemble des autres personnes inscrites sur le PassPass de <%=selected_prm%> sera
      prévenu`,
      pmr: `Bonjour et bienvenu! Je suis PassPassBot! Mon role est de faciliter votre vie en vous mettant en relation avec des personnes qui habitent à proximité de chez vous.`
    },
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
    soignants ou des secours`
  }
}, {locale: 'fr'})

// Setting default localization values (used if key in certain locale did not found).
bot.texts({
  introduction: {
    welcome: `Vous avez eu la bonne idée de flasher un QR code PassPass de <%=selected_prm%>. PassPass a
    été créé dans l’objectif d’aider les personnes à mobilité réduite pour leur faciliter
    ponctuellement le quotidien en les mettant en relation avec des personnes qui
    habitent à proximité de son domicile. <%=selected_prm%> a collé ce sticker ici pour que vous vous y
    inscriviez ! Bien entendu, plusieurs personnes peuvent s’inscrire au PassPass de
    <%=selected_prm%>, c’est même le but ! Dès qu’une personne répondra positivement à la demande
    de <%=selected_prm%>, l’ensemble des autres personnes inscrites sur le PassPass de <%=selected_prm%> sera
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
    soignants ou des secours`
  }
})

bot.command("start")
.use('before', function (ctx) {
  return ctx.sendMessage('rgx before');
})