import React from "react";
import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((quiz) => setQuestions(quiz));
  }, []);
  const deleteFunc = (deleted) => {
    const newQue = questions.filter((quizes) => quizes.id !== deleted.id);
    setQuestions(newQue);
  };
  const changeOfAnswer = (answer) => {
    const newQuestions = questions.map((item) => {
      if (item.id === answer.id) {
        return answer;
      }
      return item;
    });
    setQuestions(newQuestions);
  };
  let quizzes = questions.map((quiz) => {
    return (
      <QuestionItem
        onChangeOfAnswer={changeOfAnswer}
        question={quiz}
        deleted={deleteFunc}
        key={quiz.id}
      />
    );
  });
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{quizzes}</ul>
    </section>
  );
}

export default QuestionList