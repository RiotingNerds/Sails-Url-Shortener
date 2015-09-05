var react = require('../helpers/React')
module.exports = {
    getAllDomain: function() {
      return react.renderToString("site/rightMenu.jsx",{accounts:[]})
    }
};
