module.exports = {

	ls: function() {
      	var resource = $resource('fs/ls/{dirName}');
		return resource.get({dirName: 'fuck'});
	}
}