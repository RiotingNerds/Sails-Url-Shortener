var React = require('react'),
    jsx = require('node-jsx');
    jsx.install();


module.exports = {
	getFile: function(fileName) {
		return __dirname+"/../../react-components/"+fileName;
	},

	getFactory: function(file) {
		return React.createFactory(require(this.getFile(file)))
	},

	renderToString: function(viewFile,params) {
		var app = this.getFactory(viewFile);
		if(typeof params == "undefined")
			params = {};
        return React.renderToString(app(params));
	}
}
