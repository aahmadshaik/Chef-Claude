/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";

const ClaudeRecipe = (props) => {
  console.log(props.recipe);
  return (
    <section ref={props.ref} className="suggested-recipe-container">
      <h2>AI Suggested Recipe</h2>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  );
};
export default ClaudeRecipe;
