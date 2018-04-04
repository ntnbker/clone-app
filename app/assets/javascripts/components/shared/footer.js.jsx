var Footer = React.createClass({

    footerForExpanded() {
        const {current_role} = this.props;

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
                    <div className="two-thirds column footer-links_hp">
                        <div className="one-half column">
                            <a href="/about">About us</a>
                            {/*<a href="/">Blog</a>
                            <a href="/">Feedback</a>*/}
                            {/*<a href={this.props.new_agency_path}>Register Agent</a>*/}
                            <a href="/support">Help & Support</a>
                        </div>
                        {/*<div className="one-third column">
                            <a href="/">Community</a>
                            <a href="/">Trust & Safety</a>
                        </div>*/}
                        <div className="one-half column">
                            <a href="/general_terms_and_conditions">Terms of Service</a>
                            <a href="/privacy_policy">Privacy Policy</a>
                            { current_role === 'Trady' &&
                                <a href="/tradie_terms_and_conditions">
                                    Tradie Terms of Service
                                </a>
                            }
                            { (current_role === 'AgencyAdmin' || current_role === 'Agent') &&
                                <a href="/agent_terms_and_conditions">
                                    Agent Terms of Service
                                </a>
                            }
                            {/*<a href="/">Cookie Policy</a>*/}
                        </div>
                    </div>
                    <div className="two columns">
                        <div className="footer-social_hp">
                            {/* <a className="show-on-mobile" href={this.props.new_agency_path}>Register Agent</a>*/}
                            {/*<p>Follow us</p>
                            <div className="social-circle"> <img src="/assets/ico-twitter.png" /> </div>
                            <div className="social-circle"> <img src="/assets/ico-facebook.png" /> </div>
                            <div className="social-circle"> <img src="/assets/ico-instagram.png" /> </div>
                            <div className="social-circle"> <img src="/assets/ico-google.png" /> </div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    },

    footer() {
        const {current_role} = this.props;

        return <div className="footer-other">
            <div className="footer-custom">
                {/*<div className="footer-social">
                    <div> <img src="/assets/ico-twitter.png" /> </div>
                    <div> <img src="/assets/ico-facebook.png" /> </div>
                    <div> <img src="/assets/ico-instagram.png" /> </div>
                    <div> <img src="/assets/ico-google.png" /> </div>
                </div>*/}

                <div className="footer-links">
                    <a href="/about">About us</a>
                    {/*<a href="/">Blog</a>*/}
                    <a href="/support">Help & Support</a>
                    <a href="/general_terms_and_conditions">Terms of Service</a>
                    <a href="/privacy_policy">Privacy Policy</a>
                    { current_role === 'Trady' &&
                        <a href="/tradie_terms_and_conditions">
                            Tradie Terms of Service
                        </a>
                    }
                    { (current_role === 'AgencyAdmin' || current_role === 'Agent') &&
                        <a href="/agent_terms_and_conditions">
                            Agent Terms of Service
                        </a>
                    }
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
