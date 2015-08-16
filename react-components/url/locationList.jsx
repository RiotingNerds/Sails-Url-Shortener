(function(){
  'use strict'
  var React = require('react')
  var Rows = React.createClass({
    actionLink: function(urlModel) {
      return (
        <span>
          <a href={"/url/"+urlModel.id}><i className="fa fa-eye"></i></a>{" "}
          <a href={"/url/delete/"+urlModel.id} onClick={this.deleteUrl}><i className="fa fa-trash-o"></i></a>{" "}
          <a href={"http://"+urlModel.fullURL} target="_blank"><i className="fa fa-external-link"></i></a>
        </span>
      )
    },
    deleteUrl: function(e) {
      console.log($(e))
      $.post($(e.target).attr('href'), function(data) {
        var updateEvent = new CustomEvent("refreshUrlList")
        window.dispatchEvent(updateEvent)
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
          data: this.props.data || [],
          options: this.props.options || {
            series: {
              pie: {
                  show: true
              }
            },
            legend: {
              show: true
            },
            grid: {
              hoverable: true,
              clickable: true
            },
            colors: ["#79D1CF", "#D9DD81", "#E67A77","#545454",'#aec785','#fa8564','#fa8564','#3ac7f9','#9466b5','#ffdd00'],
            tooltip: true,
            tooltipOpts: {
              defaultTheme: false
            }
          }
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
        window.addEventListener('refreshUrlList', this.refreshUrl);
      },
      componentWillUnmount: function() {
        window.removeEventListener('refreshUrlList', this.refreshUrl);
      },
      makePie: function() {
        var data = [];
        this.state.data.forEach(function(data) {
          
        })


        $.plot($("#pie-chart #pie-chartContainer"), data, options);
      },
      render: function() {
        return (
          <section className="panel" id="urlTopList">
            <header className="panel-heading">
              Top 10 Location
            </header>
            <div className="panel-body">
              <div id="pie-chart" class="pie-chart">
                  <div id="piechart-location" style="width: 100%;height:400px; text-align: left;">
                  </div>
              </div>
            </div>
          </section>
        );
      }
    })
    module.exports = App;
}());
