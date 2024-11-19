document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipeList');
    const addRecipeForm = document.getElementById('addRecipeForm');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const createShoppingListBtn = document.getElementById('createShoppingListBtn');
    const createWeeklyMenuBtn = document.getElementById('createWeeklyMenuBtn');

    // Dummy data for testing
    let recipes = [];

    // Add Recipe Function
    addRecipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('recipeTitle').value;
        const ingredients = document.getElementById('ingredients').value.split(',').map(ingredient => ingredient.trim());
        const instructions = document.getElementById('instructions').value;

        const newRecipe = { title, ingredients, instructions };
        recipes.push(newRecipe);
        displayRecipes();
        addRecipeForm.reset();
    });

    // Display Recipes
    function displayRecipes() {
        recipeList.innerHTML = ''; // Clear previous recipes
        recipes.forEach((recipe, index) =>
