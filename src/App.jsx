import { useState } from "react";
import IngredientsList from "./components/ingredientsList";
import ClaudeRecipe from "./components/ClaudeRecipe";
import { getRecipeFromMistral } from "./ai";
import "./index.css";
import Header from "./components/Header";
import { ClipLoader } from "react-spinners";

const App = () => {
  const [ingredients, setIngredients] = useState([
    "olive oil",
    "chicken",
    "onion",
    "lemons",
  ]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const getRecipe = async () => {
    setLoading(true);
    try {
      console.log("Fetching AI recipe for:", ingredients);
      const recipeMarkdown = await getRecipeFromMistral(ingredients);

      // Ensure spinner is visible for at least 2 seconds
      setTimeout(() => {
        setRecipe(recipeMarkdown);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setLoading(false);
    }
  };

  const addIngredient = (formData) => {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  return (
    <>
      <Header />
      <main>
        <form onSubmit={addIngredient} className="add-ingredient-form">
          <input
            type="text"
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
            name="ingredient"
          />

          <button type="submit">Add ingredient</button>
        </form>

        {ingredients.length > 0 && (
          <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
        )}

        {loading ? (
          <div className="loader-container">
            <ClipLoader color="#D17557" size={50} />
            <p>Loading recipe...</p>
          </div>
        ) : (
          recipe && <ClaudeRecipe recipe={recipe} />
        )}
      </main>
    </>
  );
};

export default App;
