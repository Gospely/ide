module.exports = {

	info: function(appId) {
      	var resource = $resource('applications{/id}');
		return resource.get({id: appId});
	}

};