import React from 'react';
import ReactDOM from 'react-dom';
import { DATA } from './data.js';
import './index.scss';

const pad = (num, digits) => {
  num = num.toString();
  while (num.length < digits) num = "0" + num;
  return num;
}

class FieldLabel extends React.Component {
  render() {
    return (
      <span class="fieldLabel">{this.props.text}</span>
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
            <div className="ticket">
                <div className="field">
                  <div className="title">BULLSH*T CITATION</div>
                </div>
                <div className="field">
                  <div className="citationNumber">
                    <FieldLabel text="Citation No." />
                    #{this.getCitationNumber(this.props.id)}
                  </div>
                </div>
                <div className="field">
                <FieldLabel text="Offense" />
                  <div className="offense">
                    "{this.props.data.title}"
                  </div>
                </div>
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
        )
    }
}
  
  class BsApp extends React.Component {
    render() {
        const tickets = DATA.map((item, i) => 
            <Ticket data={item} id={i} key={`ticket-${i}`} />
        );
        console.log(tickets);
      return (
        <div className="app">
          {tickets}
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <BsApp />,
    document.getElementById('root')
  );

// ========================================

// class Square extends React.Component {
//     render() {
//       return (
//         <button className="square">
//           {/* TODO */}
//         </button>
//       );
//     }
//   }
  
//   class Board extends React.Component {
//     renderSquare(i) {
//       return <Square />;
//     }
  
//     render() {
//       const status = 'Next player: X';
  
//       return (
//         <div>
//           <div className="status">{status}</div>
//           <div className="board-row">
//             {this.renderSquare(0)}
//             {this.renderSquare(1)}
//             {this.renderSquare(2)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(3)}
//             {this.renderSquare(4)}
//             {this.renderSquare(5)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(6)}
//             {this.renderSquare(7)}
//             {this.renderSquare(8)}
//           </div>
//         </div>
//       );
//     }
//   }
  