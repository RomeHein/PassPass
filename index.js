const { router, messenger, telegram } = require('bottender/router');

module.exports = async function App(context) {
  return router([
    telegram.message(HandleMessage),
    telegram.editedMessage(HandleEditedMessage),
    telegram.channelPost(HandleChannelPost),
    telegram.editedChannelPost(HandleEditedChannelPost),
    telegram.inlineQuery(HandleInlineQuery),
    telegram.chosenInlineResult(HandleChosenInlineResult),
    telegram.callbackQuery(HandleCallbackQuery),
    telegram.shippingQuery(HandleShippingQuery),
    telegram.preCheckoutQuery(HandlePreCheckoutQuery),
    telegram.poll(HandlePoll),
    telegram.any(HandleTelegram),
    messenger.message(HandleMessage),
    messenger.accountLinking.linked(HandleAccountLinkingLinked),
    messenger.accountLinking.unlinked(HandleAccountLinkingUnlinked),
    messenger.accountLinking(HandleAccountLinking),
    messenger.delivery(HandleDelivery),
    messenger.passThreadControl(HandlePassThreadControl),
    messenger.takeThreadControl(HandleTakeThreadControl),
    messenger.requestThreadControl(HandleRequestThreadControl),
    messenger.appRoles(HandleAppRoles),
    messenger.optin(HandleOptin),
    messenger.policyEnforcement(HandlePolicyEnforcement),
    messenger.postback(HandlePostback),
    messenger.reaction.react(HandleReactionReact),
    messenger.reaction.unreact(HandleReactionUnreact),
    messenger.reaction(HandleReaction),
    messenger.read(HandleRead),
    messenger.referral(HandleReferral),
    messenger.standby(HandleStandby),
    messenger.any(HandleMessenger),
  ]);
}

async function HandleMessage(context) {
  await context.sendText('Welcome to Bottender');
}

async function HandleEditedMessage(context) {}
async function HandleChannelPost(context) {}
async function HandleEditedChannelPost(context) {}
async function HandleInlineQuery(context) {}
async function HandleChosenInlineResult(context) {}
async function HandleCallbackQuery(context) {}
async function HandleShippingQuery(context) {}
async function HandlePreCheckoutQuery(context) {}
async function HandlePoll(context) {}
async function HandleTelegram(context) {}

async function HandleAccountLinkingLinked(context) {}
async function HandleAccountLinkingUnlinked(context) {}
async function HandleAccountLinking(context) {}
async function HandleDelivery(context) {}
async function HandlePassThreadControl(context) {}
async function HandleTakeThreadControl(context) {}
async function HandleRequestThreadControl(context) {}
async function HandleAppRoles(context) {}
async function HandleOptin(context) {}
async function HandlePolicyEnforcement(context) {}
async function HandlePostback(context) {}
async function HandleReactionReact(context) {}
async function HandleReactionUnreact(context) {}
async function HandleReaction(context) {}
async function HandleRead(context) {}
async function HandleReferral(context) {}
async function HandleStandby(context) {}
async function HandleMessenger(context) {}

