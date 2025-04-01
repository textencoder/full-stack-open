const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

const Course = (props) => {
  return (
    <>
    <Header name={props.course.name} />
    <Content parts={props.course.parts} />
    <Sum parts={props.course.parts} />
    </>
  )
}

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
    return (
      props.parts.map(part => {   
        return <Part key={part.name} name={part.name} exercises={part.exercises} />
      })
    )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Sum = (props) => {
  let totals = []
  for (const part of props.parts) {
    for (const [key, value] of Object.entries(part)) {
      if (key == 'exercises') {
        totals.push(value)
      }
    }
  }
  let sum = totals.reduce((acc, el) => acc + el, 0)


  return (
    <strong>total of {sum} exercises</strong>
  )
}

export default App