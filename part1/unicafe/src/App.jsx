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
    console.log(event)
    if (event.target.value == "good") {
      props.setGood(props.good + 1);
      props.setAverage(props.average + 1);
    } else if (event.target.value == "neutral") {
      props.setNeutral(props.neutral + 1);
    } else if (event.target.value == "bad") {
      props.setBad(props.bad + 1);
      props.setAverage(props.average - 1);
    }

    props.setAll(props.all + 1);
  }

  return (
    <>
    <h1>give feedback</h1>
    <button value="good" onClick={handleClick}>good</button>
    <button value="neutral" onClick={handleClick}>neutral</button>
    <button value="bad" onClick={handleClick}>bad</button>
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
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
    <p>all {props.all}</p>
    <p>average {props.average / props.all}</p>
    <p>positive {(props.good / props.all) * 100}%</p>
    </>
  )
}