var DropContent = React.createClass({
    render: function() {
        var content = this.props.content;
        return <ul className="dropcontent">
            {
                this.props.content.map((item, index) => 
                    <li key={index}><a href={item.href}> {item.title}</a> <span>{item.count}</span></li>)
            }
        </ul>
    }
});

var DropList = React.createClass({
	propTypes: {
		children: React.PropTypes.element
	},
    getInitialState: function() {
    	return {hidden : true}
  	},

  	onDrop() {
  		this.setState({hidden: !this.state.hidden});
  	},

	render: function() {
		return <div className="droplist">
			<div className={this.state.hidden ? 'title' : 'title active'} onClick={this.onDrop}>{this.props.title}</div>
            <div className="content" style={{display: this.state.hidden ? 'none' : 'block' }}>
                <DropContent content={this.props.content}/>
            </div>
		</div>
	}
});

var P = React.createClass({
    getInitialState: function() {
        return {
           expanded: false
       };
    },

    readMore: function() {
        this.setState({
            expanded: !this.state.expanded
        });       
    },

    getMoreTextP: function() {
	    var maxLength = 200;
       	if (this.state.expanded || this.props.content.length < maxLength) {
        	return <p style={{display: "inline"}}> {this.props.content} </p>;
        } else {
        	var content = this.props.content.substr(0,maxLength-3) + "...";
			return <p style={{display: "inline"}}> {content} </p>;
        }
    },
    
    render: function() {
     var expandedDiv = this.getMoreTextP();
     var expanded = this.state.expanded;
     var maxLength = 200;
     return (
         <div className="readmore">
            { expandedDiv }
            {
            	this.props.content.length < maxLength 
            	? null
            	: <a onClick={this.readMore}>{expanded ? 'less' : 'more'}</a>
            }
            
         </div>
     );
	}
});