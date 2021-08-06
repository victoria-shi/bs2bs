import React from 'react';
import ReactDOM from 'react-dom';
import { DATA } from './data.js';
import { pad, getRandom } from './utils.js';
import './index.scss';

class Logo extends React.Component {
  render() {
    return (
      <div class="logo">
        <span class="bullIcon">
          <div class="horns">}</div>
          <div class="head">v</div>
        </span>
      </div>
      
    )
  }
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
          <div className="ticket">
            <div className="row">
              <div className="field field--bold field--no-grow field--borderless">
                <FieldLabel text="Citation No." />
                <div className="citationNumber">
                  C-{this.getCitationNumber(this.props.id)}
                </div>
              </div>
              <div className="field field--center field--borderless">
                <Barcode />
              </div>
              <div className="field field--no-grow field--borderless">
                <Logo />
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
                  <input type="radio" id="criminal" name="severity" value={0} />
                  <label htmlFor="criminal">Criminal violation</label>
                </div>
                <div>
                  <input type="radio" id="major-infraction" name="severity" value={1} />
                  <label htmlFor="major-infraction">Infraction (major)</label>
                </div>
                <div>
                  <input type="radio" id="minor-infraction" name="severity" value={2} />
                  <label htmlFor="minor-infraction">Infraction (minor)</label>
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
          </div>
      )
  }
}

class TicketLog extends React.Component {
  formatDate(date) {
    if (date) {
      return `${date.getFullYear()}/${pad(date.getMonth() + 1, 2)}/${pad(date.getDate(), 2)}`;
    }
    
    return '--';
  }

  render() {
    const rows = this.props.tickets.map((ticket, index) => 
        <tr>
          <td>{index}</td>
          <td>{ticket.title}</td>
          <td>{ticket.name}</td>
          <td>{this.formatDate(ticket.date)}</td>
        </tr>
    );

    return (
      <div className="log">
        <table>
          <tr>
            <th>#</th>
            <th>Citation</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
          {rows}
        </table>
      </div>
    );
  }
}
  
class BsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketIndex: 0,
      viewLog: false
    };

    this.prevTicket = this.prevTicket.bind(this);
    this.nextTicket = this.nextTicket.bind(this);
    this.onOpenLog = this.onOpenLog.bind(this);
    this.onCloseLog = this.onCloseLog.bind(this);
  }

  onOpenLog() {
    this.setState({ viewLog: true });
  }

  onCloseLog() {
    this.setState({ viewLog: false });
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

  renderNav() {
    let buttons = [];
    const ticketIndex = this.state.ticketIndex;
    const isLogOpen = this.state.viewLog;

    if (isLogOpen) {
      buttons = [
        <button className="navigationButton" onClick={this.onCloseLog}>Back</button>
      ];
    } else {
      buttons = [
        <button className="navigationButton" onClick={this.onOpenLog}>Open log</button>,
        <button className="navigationButton" onClick={this.prevTicket} disabled={ticketIndex === 0} aria-label="Previous ticket">←</button>,
        <button className="navigationButton" onClick={this.nextTicket} disabled={ticketIndex === DATA.length - 1} aria-label="Next ticket">→</button>
      ];
    }

    return (
      <div className="navigation">
        {buttons}
      </div>
    );
  }

  render() {
    const ticketIndex = this.state.ticketIndex;
    const ticketData = DATA[ticketIndex];
    const nav = this.renderNav();
    const isLogOpen = this.state.viewLog;
    
    return (
      <div className="app">
        <div className="app-title">
          BULLSH*T TO BULLSH*T
        </div>
        {isLogOpen
          ? <TicketLog tickets={DATA} />
          : <Ticket data={ticketData} id={ticketIndex} />
        }
        <div className="navigation">
          {nav}
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
  