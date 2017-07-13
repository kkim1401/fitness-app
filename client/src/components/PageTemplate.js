import React, {Component} from "react";
import NavBar from "./NavBar";
import ProfileBar from "./ProfileBar";

const withTemplate = InnerComponent => class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ProfileBar/>
                <NavBar/>
                <InnerComponent {...this.props}/>
            </div>
        );
    }
};

export default withTemplate;






