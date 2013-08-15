//backbone model & view definations
SMESupply.Models.UserRegister = Backbone.Model.extend({
	defaults: {
		email: null,
		password: null,
		confirmPassword: null
	},
	initialize: function () {
		this.refreshModelFromPage()
	},
	validate: function (attrs) {
		var alerts = []
		if (!attrs.email) alerts.push('email can not be empty')
		if (!this.isValidEmail(attrs.email) && attrs.email) alerts.push('please provide valid email')
		if (!attrs.password) alerts.push('password can not be empty')
		if (!attrs.confirmPassword) alerts.push('confirm password can not be empty')
		if (attrs.password !== attrs.confirmPassword) alerts.push('password and confirm password must be same')
		if (alerts.length > 0) return alerts
	},
	refreshModelFromPage: function () {
		this.set('email', $('#txtEmail').val())
		this.set('password', $('#txtPassword').val())
		this.set('confirmPassword', $('#txtConfirmPassword').val())
	},
	isUserExist: function (fn) {
		//return true or false on fn otherwise return Error
		this.refreshModelFromPage()
		var email = this.get('email')
		if (email)
			$.ajax({
				url: '/api/users/' + this.get('email'),
				async: true,
				success: function (data) {
					fn(data.exist, null)
				}
			})
		else
			fn(false, new Error('email can not be empty'))
	},
	isValidEmail: function (email) {
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email)
	}
})

SMESupply.Views.UserRegister = Backbone.View.extend({
	el: $('#backboneView'),
	events: {
		'click #btnRegister': 'submitCheck',
		'change #txtEmail': 'emailCheck'
	},
	submitCheck: function () {
		this.model.refreshModelFromPage()
		if (!this.model.isValid()) {
			(new SMESupply.Views.Alert()).render(this.model.validationError)
			return false
		}
	},
	emailCheck: function () {
		this.model.isUserExist(function (bool, err) {
			if(!err && bool)
				(new SMESupply.Views.Alert()).render(['email already exists in our system'])
		})
	}
})

//backbone initialization
var userRegisterModel = new SMESupply.Models.UserRegister()
var userRegisterView = new SMESupply.Views.UserRegister({
	model: userRegisterModel
})