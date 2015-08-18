(function(){
  'use strict'
  var React = require('react')
  var Rows = React.createClass({
    actionLink: function(urlModel) {
      var deleteUrlHref = "/url/delete/"+urlModel.id
      return (
        <span>
          <a href={"/url/"+urlModel.id}><i className="fa fa-eye"></i></a>{" "}
          <a href={deleteUrlHref} onClick={this.deleteUrl.bind(this,deleteUrlHref)}><i className="fa fa-trash-o"></i></a>{" "}
          <a href={"http://"+urlModel.fullURL} target="_blank"><i className="fa fa-external-link"></i></a>
        </span>
      )
    },
    deleteUrl: function(url,e) {
      $.post(url, function(data) {
        $(window).trigger('refreshUrlList')
      });
      return false;
    },
    render: function() {
      var self = this
      var nodes = this.props.data.map(function(urlModel){
        return (
          <tr key={urlModel.id}>
            <td><a href={"http://"+urlModel.fullURL} target="_blank">{urlModel.hash}</a></td>
            <td><a href={urlModel.redirectURL} target="_blank">{urlModel.redirectURL}</a></td>
            <td>{urlModel.totalRequested || 0}</td>
            <td>{self.actionLink(urlModel)}</td>
          </tr>
        )
      })
      return (
        <tbody>
        {nodes}
        </tbody>
      )
    }
  })
  var App = React.createClass({
      getInitialState: function() {
        return {
          accountID:this.props.accountID,
          data: this.props.data
        };
      },
      getInitialProps: function() {
        return {
          data:[],
          accountID: 0
        };
      },
      refreshUrl: function() {
        var self = this
        $.getJSON('/url/topList',function(data){
          self.setState({data:data.data})
        })
      },
      componentDidMount: function() {
        $(window).bind('refreshUrlList',this.refreshUrl)
        $(window).bind('refreshList',this.refreshUrl)
      },
      componentWillUnmount: function() {
        $(window).unbind('refreshUrlList',this.refreshUrl)
        $(window).unbind('refreshList',this.refreshUrl)
      },
      render: function() {
        return (
          <section className="panel" id="urlTopList">
            <header className="panel-heading">
              Top 10 Click
            </header>
            <div className="panel-body">
              <table className="table table-hover general-table">
                <thead>
                  <tr>
                    <th>Hash</th>
                    <th>URL</th>
                    <th>Click Count</th>
                    <th></th>
                  </tr>
                </thead>
                <Rows data={this.state.data}/>
              </table>
            </div>
          </section>
        );
      }
    })
    module.exports = App;
}());
