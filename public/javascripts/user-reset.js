//backbone model & view definations
SMESupply.Models.UserReset = Backbone.Model.extend({
	defaults: {
		txtEmail: null
	},
	initialize: function () {
		this.refreshModelFromPage()
	},
	validate: function (attrs) {
		var alerts = []
		if (!attrs.txtEmail) alerts.push('Email can not be empty')
		if (!this.isValidEmail(attrs.txtEmail) && attrs.txtEmail) alerts.push('Please provide valid email')
		if (alerts.length > 0) return alerts
	},
	refreshModelFromPage: function () {
		this.set('txtEmail', $('#txtEmail').val())
	},
	isValidEmail: function (email) {
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email)
	}
})

SMESupply.Views.UserReset = Backbone.View.extend({
	el: $('#backboneView'),
	events: {
		'click #btnReset': 'submitCheck'
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
var userResetModel = new SMESupply.Models.UserReset()

var userResetView = new SMESupply.Views.UserReset({
	model: userResetModel
})