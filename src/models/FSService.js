module.exports = {

	ls: function() {
      	var resource = $resource('fs/ls/{dirName}');
		return resource.get({dirName: 'fuck'});
	},

	rename: function(data) {
      	var resource = $resource('fs/rename');
      	console.log(resource);
		return resource.save(data);
	}
}