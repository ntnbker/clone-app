var Footer = React.createClass({

    footerForExpanded() {
        return <div className="footer-expanded">
            <div className="container">
                <div className="row">
                    <div className="one-third column">
                        <div className="footer-logo">
                            <img src="/assets/logo.png" alt="logo" />
                            MaintenanceApp
                            <p>Copyright © 2016 - MaintenanceApp.</p>
                        </div>
                    </div>
                    <div className="one-half column footer-links_hp">
                        <div className="one-third column">
                            <a href="/">About us</a>
                            <a href="/">Blog</a>
                            <a href="/">Feedback</a>
                            {/*<a href={this.props.new_agency_path}>Register Agent</a>*/}
                        </div>
                        <div className="one-third column">
                            <a href="/">Community</a>
                            <a href="/">Trust & Safety</a>
                            <a href="/">Help & Support</a>
                        </div>
                        <div className="one-third column">
                            <a href="/">Terms of Service</a>
                            <a href="/">Privacy Policy</a>
                            <a href="/">Cookie Policy</a>
                        </div>
                    </div>
                    <div className="two columns">
                        <div className="footer-social_hp">
                            {/* <a className="show-on-mobile" href={this.props.new_agency_path}>Register Agent</a>*/}
                            <p>Follow us</p>
                            <div className="social-circle"> <img src="/assets/ico-twitter.png" /> </div>
                            <div className="social-circle"> <img src="/assets/ico-facebook.png" /> </div>
                            <div className="social-circle"> <img src="/assets/ico-instagram.png" /> </div>
                            <div className="social-circle"> <img src="/assets/ico-google.png" /> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    },

    footer() {
        return <div className="footer-other">
            <div className="footer-custom">
                <div className="footer-social">
                    <div> <img src="/assets/ico-twitter.png" /> </div>
                    <div> <img src="/assets/ico-facebook.png" /> </div>
                    <div> <img src="/assets/ico-instagram.png" /> </div>
                    <div> <img src="/assets/ico-google.png" /> </div>
                </div>

                <div className="footer-links">
                    <a href="/">About us</a>
                    <a href="/">Blog</a>
                    <a href="/">Help & Support</a>
                    <a href="/">Terms of Service</a>
                    <a href="/">Privacy Policy</a>
                </div>

                <p>Copyright © 2016 - MaintenanceApp.</p>
            </div>
        </div>
    },

    componentDidMount: function() {
        $(document).ready(function () {
            var footerHeight = $('#footer').height();
            if(footerHeight > 0) {
                $('#main').css('margin-bottom', footerHeight);
            }
        });
    },

    render: function() {
        return <div  className="dontprint" id="footer">
            { this.props.expanded
            ? this.footerForExpanded()
            : this.footer() }
        </div>
    }
});
