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
      const stripeWidth = getRandom(1, 5);
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
      <span class="fieldLabel">{this.props.text}</span>
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
        / <span className="month">{this.props.date ? pad(this.props.date.getMonth() + 1, 2) : ' '}</span>
        / <span className="day">{this.props.date? pad(this.props.date.getDate(), 2) : ' '}</span>
      </div>
    )
  }
}

class Ticket extends React.Component {
  
    getCitationNumber(num) {
      return pad(num, 4);
    }

    render() {
        return (
            <li className="ticket">
              <div className="row">
                <div className="field">
                  <Barcode />
                </div>
              </div>
              <div className="row">
                <div className="field field--bold">
                  <div className="title">BULLSH*T CITATION</div>
                </div>
                <div className="field field--bold">
                  <div className="citationNumber">
                    <FieldLabel text="Citation No." />
                    #{this.getCitationNumber(this.props.id)}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="field field--bold">
                  <FieldLabel text="Your presence is requested at the Department of Bullsh*t" />
                </div>
              </div>
              <div className="row">
                <div className="field">
                <FieldLabel text="Offense" />
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
              </div>
              <div className="row">
                <div className="field">
                  <TicketDate date={this.props.data.date} />
                </div>
              </div>
              <div className="row">
                <TicketAddress address={this.props.data.address} />
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
    render() {
      const tickets = DATA.map((item, i) => 
          <Ticket data={item} id={i} key={`ticket-${i}`} />
      );

      return (
        <div className="app">
          <div className="app-title">BULLSH*T TO BULLSH*T</div>
          <ol className="tickets">
            {tickets}
          </ol>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <BsApp />,
    document.getElementById('root')
  );
  