if (typeof window['SMESupply'] === 'undefined')
	window.SMESupply = {
		Models: {},
		Views: {},
		Collections: {}
	}

//manipulating partial_views/alerts.jade for displaying alert msg
SMESupply.Views.Alert = Backbone.View.extend({
	el: $('#alert-container'),
	template: _.template('<div id="backbone-alert" class="alert alert-danger">' +
						'<button class="close" data-dismiss="alert">&times;</button>' +
						'<%= alertList %>' +
						'</div>'),
	render: function (alertList) {
		var alert_li = ''
		_.each(alertList, function (alert) {
			alert_li += '<div>' + alert + '</div>'
		})
		this.$el.find('#backbone-alert').remove()
		this.$el.append( this.template( { alertList: alert_li } ) )
	}
})

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
		var guides = []
		if (!attrs.email) guides.push('email can not be empty')
		if (!this.isValidateEmail(attrs.email) && attrs.email) guides.push('please provide valid email')
		if (!attrs.password) guides.push('password can not be empty')
		if (!attrs.confirmPassword) guides.push('confirm password can not be empty')
		if (attrs.password !== attrs.confirmPassword) guides.push('password and confirm password must be same')
		if (guides.length > 0) return guides
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
	isValidateEmail: function (email) {
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email)
	}
})

SMESupply.Views.UserRegister = Backbone.View.extend({
	el: $('.container'),
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
var userRegister = new SMESupply.Models.UserRegister()
var userRegisterView = new SMESupply.Views.UserRegister({
	model: userRegister
})