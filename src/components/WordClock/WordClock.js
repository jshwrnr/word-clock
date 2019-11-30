import React, { Component, Fragment } from "react";

const colors = { lit: "#fff", dim: "#707790" };
const glowShadow = "0px 0px 10px rgba(173, 216, 230, 0.7), 0px 0px 4px rgba(0, 0, 255, 0.5)";

const styles = {
  clock: {
    background: "#000",
    color: colors.dim,
    borderRadius: "10px",
    width: "500px",
    height: "500px",
    padding: "45px 60px",
  },
  clockText: {
    color: colors.dim,
    margin: "0px",
    fontFamily: "Eurostile",
    fontSize: "35px",
    lineHeight: "55px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  remainingSquares: {
    textAlign: "center",
  },
  remainingSquare: {
    width: "16px",
    height: "16px",
    display: "inline-block",
    margin: "12px",
    background: colors.dim,
  },
  textLit: {
    color: colors.lit,
    textShadow: glowShadow,
  },
  squareLit: {
    background: colors.lit,
    boxShadow: glowShadow,
  },
};

let clockText = [
  "IT IS",
  "HALF",
  "TEN",
  "QUARTER",
  "TWENTY",
  "FIVE",
  "MINUTES",
  "TO",
  "PAST",
  "TWO",
  "THREE",
  "ONE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
  "TEN",
  "ELEVEN",
  "TWELVE",
  "O'CLOCK",
];

class WordClock extends Component {
  state = {
    activeWords: [],
    remainingMinutes: 0,
  };

  getHours12 = hour => {
    return (hour + 24) % 12 || 12;
  };

  getActiveWordsArr = (hours, minutes) => {
    let unit = Math.floor(minutes / 5);

    let activeWords = [true]; // IT IS

    if (unit === 0) {
      activeWords[21] = true; // O'CLOCK
    } else {
      if (unit === 6) activeWords[1] = true; // HALF
      if (unit === 2 || unit === 10) activeWords[2] = true; // TEN
      if (unit === 3 || unit === 9) activeWords[3] = true; // QUARTER
      if ([4, 5, 7, 8].indexOf(unit) != -1) activeWords[4] = true; // TWENTY
      if ([1, 5, 7, 11].indexOf(unit) != -1) activeWords[5] = true; // FIVE
      if ([1, 2, 4, 5, 7, 8, 10, 11].indexOf(unit) != -1) activeWords[6] = true; // MINUTES
      if (unit > 6) activeWords[7] = true; // TO
      if (unit > 0 && unit < 7) activeWords[8] = true; // PAST
    }

    if (minutes > 34) {
      hours = this.getHours12(hours + 1);
    }

    if (hours === 1) {
      activeWords[11] = true; // ONE
    } else if (hours === 2) {
      activeWords[9] = true; // TWO
    } else if (hours === 3) {
      activeWords[10] = true; // THREE
    } else {
      activeWords[12 + (hours - 4)] = true; // All other hours...
    }

    return activeWords;
  };

  updateClock = () => {
    let date = new Date();
    const hours = this.getHours12(date.getHours());
    const minutes = date.getMinutes();
    this.setState({ activeWords: this.getActiveWordsArr(hours, minutes), remainingMinutes: minutes % 5 });
  };

  componentDidMount() {
    this.updateClock();
    let date = new Date();

    // Wait until the next minute starts
    setTimeout(() => {
      this.updateClock();

      // Update clock once per minute
      setInterval(() => this.updateClock(), 60 * 1000);
    }, (60 - date.getSeconds()) * 1000);
  }

  render() {
    const { activeWords, remainingMinutes } = this.state;

    return (
      <div style={styles.clock}>
        <p style={styles.clockText}>
          {clockText.map((text, i) => {
            return text ? (
              <span
                style={{
                  margin: text === "FOUR" ? "0px 20px" : "",
                  color: activeWords[i] ? colors.lit : "",
                  textShadow: activeWords[i] ? glowShadow : "",
                }}
                key={i}
              >
                {text}
              </span>
            ) : null;
          })}
        </p>
        <div style={styles.remainingSquares}>
          {Array.from({ length: 4 }).map((item, i) => (
            <div
              style={remainingMinutes > i ? { ...styles.remainingSquare, ...styles.squareLit } : styles.remainingSquare}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default WordClock;
