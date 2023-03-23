import React, {useState} from "react";
import {GlobalStyle} from './GlobalStyle.styled'
import Feedback from "./Feedback";
import Statistics from "./Statistics";
import Section from "./Section";
import Notification from "./Notification";

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleFeedback = e => {
    const feedback = e.currentTarget.name;

    switch (feedback) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };
  const option = Object.keys({good, neutral, bad})
  const countTotalFeedback = () => {
    return good + neutral + bad
  }

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback()
    return total !== 0 ? Math.round((good * 100) / total) : 0
  }


  const total = countTotalFeedback();

  return (
    <>
      <Section title="Please leave feedback">
        <Feedback options={option}
                  onFeedback={handleFeedback}/>
      </Section>

      <Section title="Statistics">
        {total > 0 ? (<Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}/>) : (<Notification message="There is no feedback"/>)}
      </Section>
      <GlobalStyle/>
    </>)

}

export default App;
