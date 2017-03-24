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


var ImgSlider = React.createClass({
    getInitialState: function() {
        return {
           stlen: this.props.images ? this.props.images.length : 0,
           stpos: 0,
           stwidth: 400,
           stx: 0
       };
    },

    sliderTopRun(stpos) {
        var stx = stpos * -this.state.stwidth;

        this.setState({
            stx: stx
        });
    },

    sliderTopPrev() {
        var stpos = this.state.stpos - 1;
        if(stpos < 0) stpos = this.state.stlen - 1;
        this.setState({
            stpos: stpos
        });
        this.sliderTopRun(stpos);
    },

    sliderTopNext() {
        var stpos = this.state.stpos + 1;
        if(stpos >= this.state.stlen) stpos = 0;
        this.setState({
            stpos: stpos
        }); 
        this.sliderTopRun(stpos);
    },

    render: function() {
        var style = {
            left: this.state.stx,
            width: this.state.stlen * this.state.stwidth,
        };

        return <div id="slider">
            { this.state.stlen > 1
              ? <div>
                    <button className="button btn prev" onClick={this.sliderTopPrev}><i className="fa fa-angle-left"></i></button>
                    <button className="button btn next" onClick={this.sliderTopNext}><i className="fa fa-angle-right"></i></button>
                </div>
              : null
            }
            <div className="mask">
                <div className="strip" style={style}>
                { this.state.stlen
                  ? this.props.images.map((image, i) => {
                    return <span key={i}>
                        <img src={image.url} alt="Uploading..." />
                    </span>
                  })
                  : <span>
                        <img src="http://placehold.it/400x300" alt="No image" />
                    </span>
                }
                </div>
            </div>
        </div>
    }
});

var DropforSort = React.createClass({
    getInitialState: function() {
        return {
          sort_by_date: this.props.sort_by_date ? this.props.sort_by_date : ''
       };
    },

    handleChange(event) {
      this.setState({sort_by_date: event.target.value});
      this.refs.select.submit();
    },

    render: function() {
      return <form name="sort_by_date" action="/maintenance_requests" method="get" ref="select">
        <select value={this.state.sort_by_date} name='sort_by_date' onChange={this.handleChange}>
          <option value="Oldest to Newest">Oldest to Newest</option>
          <option value="Newest to Oldest">Newest to Oldest</option>
        </select>
        <input type="hidden" name="page" value={this.props.page}/>
        <input type="submit" value="Submit" style={{display:'none'}}/>
      </form>
    }
});