import { connect } from "react-redux";
import { Component } from "react";
import InstrumentOptions from "../../Misc/InstrumentOptions";
import GenericTag from "../../Tags/GenericTag";
import { updateUser } from "../../../actions/useractions";

class EditInstrumentsForm extends Component {
  state = {
    instruments: this.props.user.instruments.map(
      (instrument) => instrument.name
    ),
    canUpdate: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.instruments !== this.state.instruments) {
      this.setState({ canUpdate: true });
    }
  }

  updateInstruments = (e) => {
    e.preventDefault();
    this.props.updateUser({
      instruments_attributes: this.state.instruments.map((instrument) => {
        return { name: instrument };
      }),
    });
  };

  setInstruments = (instrument) => {
    this.setState((state) => ({
      instruments: state.instruments.concat(instrument),
    }));
  };

  removeInstrument = (e, instrument) => {
    e.preventDefault();
    this.setState((state) => ({
      instruments: state.instruments.filter((inst) => inst !== instrument),
    }));
  };

  render() {
    return (
      <>
        <form>
          <div className="form-group">
            <InstrumentOptions setInstruments={this.setInstruments} />
          </div>
          <div>
            {this.state.instruments.map((instrument) => (
              <GenericTag
                tag={instrument}
                editable={true}
                removeTag={this.removeInstrument}
              />
            ))}
          </div>
          {this.state.canUpdate ? (
            <button
              className="save-btn"
              type="button"
              onClick={(e) => this.updateInstruments(e)}
            >
              Update Instruments
            </button>
          ) : null}
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userParams) => dispatch(updateUser(userParams)),
  };
};

export default connect(null, mapDispatchToProps)(EditInstrumentsForm);
