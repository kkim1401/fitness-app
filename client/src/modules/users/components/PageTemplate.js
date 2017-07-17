import React, {Component} from "react";
import NavBar from "./NavBar";
import ProfileBar from "./ProfileBar";

const withTemplate = InnerComponent => class extends Component {
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






