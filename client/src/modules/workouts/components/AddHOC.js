import React, {Component} from "react";

const withAdd = (InnerComponent, ComponentToAdd) => class extends Component {
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
        const componentsToAdd = [...Array(this.state.count).keys()];

        return (
            <div>
                <InnerComponent {...this.props}/>
                {componentsToAdd.map((item, index) => <ComponentToAdd key={index} number={index+1}/>)}
                <button className="add" onClick={this.add}>Add</button>
            </div>
        )
    }
};

export default withAdd;