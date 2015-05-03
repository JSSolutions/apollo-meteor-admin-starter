@subs = new SubsManager()

Router.configure
  layoutTemplate: "masterLayout"
  loadingTemplate: "loading"
  notFoundTemplate: "notFound"
  routeControllerNameConverter: "camelCase"

  onBeforeAction: ->
  	# Redirect to set username if required
    if Config.username and Meteor.userId() and not Meteor.user().username
      @redirect '/setUserName'
    @next()


Router.waitOn ->
  subs.subscribe 'user'

onAfterAction = ->
  window.scrollTo(0,0)
  $('body').removeClass('sidebar-active')

  # Remove modal
  $bd =  $('.modal-backdrop')
  $bd.removeClass('in')
  setTimeout ->
    $bd.remove()
  , 300

Router.onAfterAction onAfterAction

#To allow non-logged in users to access more routes, add it in the config file
Router.plugin 'ensureSignedIn', except: [
  'home'
  'atSignIn'
  'atSignUp'
  'atForgotPassword'
  'atSignOut'
]
  

saveRedirectUrl = ->
  unless Meteor.loggingIn()
    if not Meteor.user()
      Session.set 'redirectToAfterSignIn', @url
  @next()

publicRoutes = _.union Config.publicRoutes, ['atSignIn','atSignUp','atForgotPassword']


Router.onBeforeAction saveRedirectUrl, {except: _.union publicRoutes, ['atSignOut']}

signInProhibited = ->
  if Meteor.user()
    Router.go('dashboard')
  else
    if @next
      @next()
      

Router.onBeforeAction signInProhibited, {only: ['atSignOut','atSignUp','atForgotPassword']}
