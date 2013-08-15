//backbone model & view definations
SMESupply.Models.UserLogin = Backbone.Model.extend({
	defaults: {
		email: null,
		password: null,
		rememberMe: null
	},
	initialize: function () {
		this.refreshModelFromPage()
	},
	validate: function (attrs) {
		var alerts = []
		if (!attrs.email) alerts.push('email can not be empty')
		if (!this.isValidEmail(attrs.email) && attrs.email) alerts.push('please provide valid email')
		if (!attrs.password) alerts.push('password can not be empty')
		if (alerts.length > 0)
			return alerts
	},
	refreshModelFromPage: function () {
		this.set('email', $('#txtEmail').val())
		this.set('password', $('#txtPassword').val())
		this.set('rememberMe', $('#chkRememberMe').val())
	},
	isValidEmail: function (email) {
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email)
	}
})

SMESupply.Views.UserLogin = Backbone.View.extend({
	el: $('#backboneView'),
	events: {
		'click #btnSubmit' : 'submitCheck'
	},
	submitCheck: function () {
		this.model.refreshModelFromPage()
		if (!this.model.isValid()) {
			(new SMESupply.Views.Alert()).render(this.model.validationError)
			return false
		}
	}
})

//backbone initialization
var userLoginModel = new SMESupply.Models.UserLogin()
var userLoginView = new SMESupply.Views.UserLogin({
	model: userLoginModel
})