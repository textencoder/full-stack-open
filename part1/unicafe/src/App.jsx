import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
    <Feedback 
    good={good}
    setGood={setGood}
    neutral={neutral}
    setNeutral={setNeutral}
    bad={bad}
    setBad={setBad}
    />
    <Stats 
    good={good}
    neutral={neutral}
    bad={bad}
    />
    </>
  )
}

export default App

function Feedback(props) {
  return (
    <>
    <h1>give feedback</h1>
    <button onClick={() => props.setGood(props.good + 1)}>good</button>
    <button onClick={() => props.setNeutral(props.neutral + 1)}>neutral</button>
    <button onClick={() => props.setBad(props.bad + 1)}>bad</button>
    </>
  )
}

function Stats(props) {
  return (
    <>
    <h1>statistics</h1>
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
    </>
  )
}