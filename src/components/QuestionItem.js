import React from "react";
function QuestionItem({ question, onChangeOfAnswer, deleted }) {
  const { id, prompt, answers, correctIndex } = question;
  
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  const deleteFunc = () => {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => deleted(question));
  };
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeOfAnswer}>
          {options}
        </select>
      </label>
      <button onClick={deleteFunc}>Delete Question</button>
    </li>
  );
  function changeOfAnswer(event) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: parseInt(event.target.value),
      }),
    })
      .then((r) => r.json())
      .then(() => onChangeOfAnswer(question));
  }
}

export default QuestionItem;