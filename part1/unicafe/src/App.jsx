import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);

  return (
    <>
    <Feedback 
    good={good}
    setGood={setGood}
    neutral={neutral}
    setNeutral={setNeutral}
    bad={bad}
    setBad={setBad}
    all={all}
    setAll={setAll}
    average={average}
    setAverage={setAverage}
    />
    <Stats 
    good={good}
    neutral={neutral}
    bad={bad}
    all={all}
    average={average}
    />
    </>
  )
}

export default App

function Feedback(props) {
  function handleClick(event) {
    console.log(event);
    if (event.target.textContent == "good") {
      props.setGood(props.good + 1);
      props.setAverage(props.average + 1);
    } else if (event.target.textContent == "neutral") {
      props.setNeutral(props.neutral + 1);
    } else if (event.target.textContent == "bad") {
      props.setBad(props.bad + 1);
      props.setAverage(props.average - 1);
    }

    props.setAll(props.all + 1);
  }

  return (
    <>
    <h1>give feedback</h1>
    <Button text="good" handleClick={handleClick}/>
    <Button text="neutral" handleClick={handleClick}/>
    <Button text="bad" handleClick={handleClick}/>
    </>
  )
}

function Stats(props) {
  if (props.all == 0) {
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
    <h1>statistics</h1>
    <table>
      <tbody>
    <StatisticLine text="good" value={props.good}/>
    <StatisticLine text="neutral" value={props.neutral}/>
    <StatisticLine text="bad" value={props.bad}/>
    <StatisticLine text="all" value={props.all}/>
    <StatisticLine text="average" value={props.average / props.all}/>
    <StatisticLine text="positive" value={(props.good / props.all) * 100} symbol="%"/>
    </tbody>
    </table>
    </>
  )
}

function Button(props) {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

function StatisticLine(props) {
  return (
    <tr>
    <td>{props.text}</td> 
    <td>{props.value}{props.symbol}</td>
    </tr>
  )
}