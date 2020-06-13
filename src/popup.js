import React from "react";
import Popup from "reactjs-popup";

class GamePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open : false};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({ open: true });
    }
    closeModal() {
        this.setState({ open: false });
    }

    render() {
        return (
            <div>
                <button className="button" onClick={this.openModal}>
                    Controlled Popup
                </button>
                <Popup
                    open={this.state.open}
                    onClose={this.closeModal}
                >
                    <div className="modal">
                        <a className="close" onClick={this.closeModal}>
                            &times;
                        </a>
                        <h3>{this.props.title}</h3>
                        <p>{this.props.text}</p>
                    </div>
                </Popup>
            </div>
        );
    }
}
export default GamePopup;