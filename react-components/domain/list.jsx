(function(){
  'use strict'
  var React = require('react')

  var Rows = React.createClass({
    getInitialState: function() {
      return {
        accountID:this.props.accountID || 0,
        data:this.props.data ||[]
      };
    },
    statusLabel: function(status) {
      switch (status) {
        case "true": return (<span className='label label-primary'>Active</span>)
          break
        case "false":
        default: return (<span className="label label-danger">InActive</span>)
          break;

      }
    },
    refreshList:function() {
      $.getJSON('/domain/list',function(data){
        this.setState({
          data:data.data
        })
      })
    },
    componentDidMount: function() {
      window.addEventListener('refreshList', this.refreshList);
    },
    componentWillUnmount: function() {
      window.removeEventListener('refreshList', this.refreshList);
    },
    actionLink: function(domain) {
      return (
        <span>
          <a href={"/domain/"+domain.id}><i className="fa fa-eye"></i></a>{" "}
          <a href={"/domain/update/"+domain.id}><i className="fa fa-pencil"></i></a>{" "}
          <a href={"/domain/delete/"+domain.id}><i className="fa fa-trash-o"></i></a>{" "}
        </span>
      )
    },
    render: function() {
      var self = this
      var nodes = this.state.data.map(function(domain) {
        var style = {'textAlign':'center'}
        var address = ''
        return (
          <tr key={domain.id}>
            <td>{domain.domain}</td>
            <td>{domain.urlCount || 0}</td>
            <td>{self.statusLabel(domain.status)}</td>
            <td>{self.actionLink(domain)}</td>
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
      render: function() {
        return (
          <section className="panel" id="domainList">
            <div className="panel-body">
              <table className="table table-hover general-table">
                <thead>
                  <tr>
                    <th>Domain</th>
                    <th>URL Created</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <Rows data={this.props.data}/>
              </table>
            </div>
          </section>
        );
      }
    })
    module.exports = App;
}());
