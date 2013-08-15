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