import React, {Component} from "react";
import getDisplayName from "react-display-name";

const withAdd = InnerComponent => class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        };
        this.addInstance = this.addInstance.bind(this);
        this.deleteInstance = this.deleteInstance.bind(this);
    }

    addInstance() {
        this.setState((prevState) => ({
            count: prevState.count + 1
        }));
    }

    deleteInstance() {
        this.setState((prevState) => ({
            count: prevState.count - 1
        }));
    }

    render() {
        //Creates an array of increasing numbers, starting from 0, up until count-1.
        const innerComponents = [...Array(this.state.count).keys()];

        //Adding type="button" to buttons since possible bug(?) in React sets default type of all buttons as "submit".
        return (
            <section className={this.props.className}>
                {innerComponents.map((item, index) => (
                    <div key={index}>
                        <InnerComponent number={index+1} {...this.props}/>
                        <button className="delete" type="button" onClick={this.deleteInstance}>Delete</button>
                    </div>
                    ))}
                <button className="add" type="button" onClick={this.addInstance}>{`Add ${getDisplayName(InnerComponent)}`}</button>
            </section>
        )
    }
};

export default withAdd;