import { useState, useEffect, useRef } from "react";
import IngredientsList from "./components/ingredientsList";
import ClaudeRecipe from "./components/ClaudeRecipe";
import { getRecipeFromMistral } from "./ai";
import "./index.css";
import Header from "./components/Header";
import { ClipLoader } from "react-spinners";
import { Instructions } from "./components/Instructions";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const recipeSection = useRef(null);

  useEffect(() => {
    if (recipe && recipeSection.current) {
      requestAnimationFrame(() => {
        const yCoord =
          recipeSection.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: yCoord,
          behavior: "smooth",
        });
      });
    }
  }, [recipe]);

  const getRecipe = async () => {
    setLoading(true); // Start loading as soon as function is called
    try {
      console.log("Fetching AI recipe for:", ingredients);
      const recipeMarkdown = await getRecipeFromMistral(ingredients);

      setRecipe(recipeMarkdown); // Set recipe once the data is fetched
      setLoading(false); // Stop loading
    } catch (error) {
      console.log(error);
      alert("Error fetching recipe:", error);
      setLoading(false); // Stop loading if there is an error
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
        <form action={addIngredient} className="add-ingredient-form">
          <input
            type="text"
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
            name="ingredient"
            required
          />
          <button type="submit">Add ingredient</button>
        </form>

        {ingredients.length > 0 ? (
          <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
        ) : (
          <Instructions />
        )}

        {loading ? (
          <div className="loader-container">
            <ClipLoader color="#D17557" size={50} />
            <p>Loading recipe...</p>
          </div>
        ) : (
          recipe && <ClaudeRecipe ref={recipeSection} recipe={recipe} />
        )}
      </main>
    </>
  );
};

export default App;
