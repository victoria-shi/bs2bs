import React from 'react';
import ReactDOM from 'react-dom';
import { DATA } from './data.js';
import './index.scss';

const pad = (num, digits) => {
  num = num.toString();
  while (num.length < digits) num = "0" + num;
  return num;
}

const getRandom = function(min, max) {
  return Math.random() * (max - min) + min;
}


class Barcode extends React.Component {
  generateStripes() {
    const barcodeWidth = 240;

    const stripeColors = ['#0f0f0f', 'transparent'];

    const stripes = [];
    let sum = 0;
    let stripeIndex = 0;
    while (sum < barcodeWidth) {
      const stripeWidth = getRandom(1, 6);
      const stripeColor = stripeIndex % 2 ? stripeColors[0] : stripeColors[1];

      stripes.push(<span className="stripe" style={{width: stripeWidth + 'px', backgroundColor: stripeColor}}></span>);

      sum = sum + stripeWidth;
      stripeIndex = stripeIndex + 1;
    }

    return stripes;
  }

  render() {
    const stripes = this.generateStripes();

    const barcodeNumberOne = pad(Math.floor(getRandom(0, 99999)), 5);
    const barcodeNumberTwo = pad(Math.floor(getRandom(0, 999999)), 6);

    return (
      <div className="barcode">
        <div className="stripes">
          {stripes}
        </div>
        <div className="barcodeNumber">
          <span className="barcodeNumber__number">{barcodeNumberOne}</span>
          <span className="barcodeNumber__number">{barcodeNumberTwo}</span>
        </div>
      </div>
    );
  }
}

class FieldLabel extends React.Component {
  render() {
    return (
      <span className="fieldLabel">{this.props.text}</span>
    )
  }
}

class TicketAddress extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="field">
          <FieldLabel text="City"/>
          <span className="city">{this.props.address.city}</span>
        </div>
        <div className="field">
          <FieldLabel text="State"/>
          <span className="state">{this.props.address.state}</span>
        </div>
        <div className="field">
          <FieldLabel text="Country"/>
          <span className="country">{this.props.address.country}</span>
        </div>
      </div>
    )
  }
}

class TicketDate extends React.Component {
  render() {
    return (
      <div className="date">
        <FieldLabel text="Date of violation"/>
        <span className="year">{this.props.date ? this.props.date.getFullYear() : ' '}</span>
        /<span className="month">{this.props.date ? pad(this.props.date.getMonth() + 1, 2) : ' '}</span>
        /<span className="day">{this.props.date? pad(this.props.date.getDate(), 2) : ' '}</span>
      </div>
    )
  }
}

class Ticket extends React.Component {
    getCitationNumber(num) {
      return pad(num, 5);
    }

    render() {
        return (
            <li className="ticket">
              <div className="row">
                <div className="field">
                  <Barcode />
                </div>
                <div className="field field--bold field--no-grow">
                  <FieldLabel text="Citation No." />
                  <div className="citationNumber">
                    C-{this.getCitationNumber(this.props.id)}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="field field--bold">
                  <FieldLabel text="Bullsh*t Citation" />
                  <div className="offense">
                    "{this.props.data.title}"
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <FieldLabel text="Name" />
                  <div className="name">
                    {this.props.data.name}
                  </div>
                </div>
                <div className="field">
                  <TicketDate date={this.props.data.date} />
                </div>
              </div>
              <div className="row">
                <TicketAddress address={this.props.data.address} />
              </div>
              <div className="row">
                <div className="field">
                <FieldLabel text="Severity"></FieldLabel>
                  <div>
                    <input type="radio" id="criminal" name="severity" value="criminal"/>
                    <label for="criminal">Criminal violation</label>
                  </div>
                  <div>
                    <input type="radio" id="major-infraction" name="severity" value="major-infraction"/>
                    <label for="major-infraction">Infraction (major)</label>
                  </div>
                  <div>
                    <input type="radio" id="minor-infraction" name="severity" value="minor-infraction"/>
                    <label for="minor-infraction">Infraction (minor)</label>
                  </div>
                </div>
                <div className="field">
                  <FieldLabel text="Penalty Assessed"></FieldLabel>
                  ${getRandom(100, 10000).toFixed(2)}
                </div>
              </div>
              <div className="row">
                  <div className="field">
                    <FieldLabel text="Signature"></FieldLabel>
                    <div className="signature"></div>
                  </div>
                  
                </div>
            </li>
        )
    }
}
  
  class BsApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ticketIndex: 0
      };

      this.prevTicket = this.prevTicket.bind(this);
      this.nextTicket = this.nextTicket.bind(this);
    }

    prevTicket() {
      const ticketIndex = this.state.ticketIndex;

      if (ticketIndex > 0) {
        this.setState({
          ticketIndex: ticketIndex - 1
        });
      }
    }

    nextTicket() {
      const ticketIndex = this.state.ticketIndex;

      if (ticketIndex + 1 < DATA.length) {
        this.setState({
          ticketIndex: ticketIndex + 1
        });
      }
    }

    render() {
      const ticketIndex = this.state.ticketIndex;
      const ticketData = DATA[ticketIndex];

      return (
        <div className="app">
          <div className="app-title">
            BULLSH*T TO BULLSH*T
          </div>
          <div className="tickets">
            <Ticket data={ticketData} id={ticketIndex} />
          </div>
          <div className="navigation">
            <button className="navigationButton" onClick={this.prevTicket}>Previous</button>
            <button className="navigationButton" onClick={this.nextTicket}>Next</button>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <BsApp />,
    document.getElementById('root')
  );
  