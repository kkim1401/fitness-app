import React, {Component} from "react";
import getDisplayName from "react-display-name";

const withAdd = InnerComponent => class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        };
        this.add = this.add.bind(this);
    }

    add() {
        this.setState((prevState) => ({
            count: prevState.count + 1
        }));
    }

    render() {
        //Creates an array of increasing numbers, starting from 0, up until count-1.
        const innerComponents = [...Array(this.state.count).keys()];

        return (
            <section className={this.props.className}>
                {innerComponents.map((item, index) =>
                    <InnerComponent key={index} number={index+1} {...this.props}/>)}
                <button className="add" onClick={this.add}>{`Add ${getDisplayName(InnerComponent)}`}</button>
            </section>
        )
    }
};

export default withAdd;