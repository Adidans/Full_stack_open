/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

const Statistics = ({ good, neutral, bad }) => {
    return (
        <>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <StatisticLine text="Good: " value={good}></StatisticLine>
                    <StatisticLine
                        text="Neutral: "
                        value={neutral}
                    ></StatisticLine>
                    <StatisticLine text="Bad: " value={bad}></StatisticLine>
                    <StatisticLine
                        text="All: "
                        value={good + neutral + bad}
                    ></StatisticLine>
                    <StatisticLine
                        text="Average: "
                        value={(good - bad) / (good + neutral + bad)}
                    ></StatisticLine>
                    <StatisticLine
                        text="Positive: "
                        value={(good / (good + neutral + bad)) * 100 + "%"}
                    ></StatisticLine>
                </tbody>
            </table>
        </>
    );
};

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <>
            <h1>Give Feedback</h1>
            <div className="buttons">
                <button onClick={() => setGood(good + 1)}>Good</button>
                <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
                <button onClick={() => setBad(bad + 1)}>Bad</button>
            </div>
            {good + neutral + bad === 0 ? (
                <p>No feedback given</p>
            ) : (
                <Statistics good={good} neutral={neutral} bad={bad} />
            )}
        </>
    );
}

export default App;
