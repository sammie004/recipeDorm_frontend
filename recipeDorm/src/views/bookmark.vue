<template>
  <Navbar />
  <div class="bookmark-page">
    <h1>Saved Recipes</h1>

    <!-- Search Bar -->
    <input
      v-model="searchQuery"
      placeholder="Search bookmarks..."
      aria-label="Search Bookmarks"
      class="search-bar"
    />

    <!-- Bookmark List -->
    <div class="bookmark-list">
      <div
        class="bookmark-item"
        v-for="recipe in filteredBookmarks"
        :key="recipe.id"
      >
        <RecipeCard
          :id="recipe.id"
          :title="recipe.title"
          :description="recipe.description"
          :image="recipe.image"
          :isBookmarked="true"
          @toggleBookmark="removeBookmark(recipe.id)"
        />
      </div>
      <p v-if="filteredBookmarks.length === 0" class="no-results">
        No recipes found.
      </p>
    </div>
  </div>
</template>

<script>
import RecipeCard from "@/components/cards.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    RecipeCard,
    Navbar,
  },
  data() {
    return {
      searchQuery: "",
      bookmarks: [
        { id: 1, title: "Spaghetti Carbonara", description: "A classic Italian pasta dish.", image: "https://via.placeholder.com/300" },
        { id: 2, title: "Classic Margherita Pizza", description: "Delicious and cheesy homemade pizza.", image: "https://via.placeholder.com/300" },
        { id: 3, title: "Grilled Salmon", description: "Healthy and savory grilled salmon.", image: "https://via.placeholder.com/300" },
        { id: 4, title: "Chicken Alfredo", description: "Creamy and savory chicken pasta.", image: "https://via.placeholder.com/300" },
        { id: 5, title: "Beef Tacos", description: "Spicy and flavorful beef tacos.", image: "https://via.placeholder.com/300" },
        { id: 6, title: "Vegetable Stir Fry", description: "A healthy and quick stir fry.", image: "https://via.placeholder.com/300" },
        { id: 7, title: "Caesar Salad", description: "Crisp lettuce with creamy dressing.", image: "https://via.placeholder.com/300" },
        { id: 8, title: "Chocolate Cake", description: "Rich and moist chocolate delight.", image: "https://via.placeholder.com/300" },
        { id: 9, title: "Pumpkin Soup", description: "Warm and creamy autumn soup.", image: "https://via.placeholder.com/300" },
        { id: 10, title: "Fish and Chips", description: "Crispy fish with golden fries.", image: "https://via.placeholder.com/300" },
        { id: 11, title: "BBQ Ribs", description: "Sticky and smoky barbecue ribs.", image: "https://via.placeholder.com/300" },
        { id: 12, title: "Pancakes", description: "Fluffy pancakes with syrup.", image: "https://via.placeholder.com/300" },
        { id: 13, title: "Mango Smoothie", description: "Refreshing and sweet drink.", image: "https://via.placeholder.com/300" },
        { id: 14, title: "Stuffed Peppers", description: "Bell peppers with savory filling.", image: "https://via.placeholder.com/300" },
        { id: 15, title: "Garlic Bread", description: "Crispy and buttery garlic bread.", image: "https://via.placeholder.com/300" },
        { id: 16, title: "Lasagna", description: "Layered pasta with rich sauce.", image: "https://via.placeholder.com/300" },
        { id: 17, title: "Fried Rice", description: "Savory and aromatic fried rice.", image: "https://via.placeholder.com/300" },
        { id: 18, title: "Tomato Bruschetta", description: "Toasted bread with tomato topping.", image: "https://via.placeholder.com/300" },
        { id: 19, title: "Apple Pie", description: "Classic dessert with apple filling.", image: "https://via.placeholder.com/300" },
        { id: 20, title: "Greek Salad", description: "Fresh salad with feta cheese.", image: "https://via.placeholder.com/300" },
        { id: 21, title: "Clam Chowder", description: "Creamy seafood soup.", image: "https://via.placeholder.com/300" },
        { id: 22, title: "Buffalo Wings", description: "Spicy and crispy chicken wings.", image: "https://via.placeholder.com/300" },
        { id: 23, title: "Mushroom Risotto", description: "Creamy rice with mushrooms.", image: "https://via.placeholder.com/300" },
        { id: 24, title: "Banana Bread", description: "Moist bread with ripe bananas.", image: "https://via.placeholder.com/300" },
      ],
    };
  },
  computed: {
    filteredBookmarks() {
      return this.bookmarks.filter((recipe) =>
        recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    removeBookmark(id) {
      this.bookmarks = this.bookmarks.filter((recipe) => recipe.id !== id);
    },
  },
};
</script>

<style scoped>
/* PAGE CONTAINER */
.bookmark-page {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  padding: 50px 20px; 
  min-height: 100vh; /* Full height */
  background-color: #ffffff;
  box-sizing: border-box; /* Ensure padding is included */
  overflow-x: hidden; /* Prevent horizontal scroll */
}

/* TITLE */
h1 {
  color: #4c4242;
  margin-bottom: 30px;
  margin-top: 40px;
  text-align: center;
}

/* SEARCH BAR */
.search-bar {
  margin-bottom: 70px;
  padding: 12px;
  width: 100%;
  max-width: 500px; /* Better control on large screens */
  text-align: center;
  border: 1px solid #4c4242;
  border-radius: 8px;
  box-sizing: border-box;

}

/* BOOKMARK LIST */
.bookmark-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* Auto-resize for better fit */
  gap: 40px; /* Improved spacing between cards */
  width: 100%;
  max-width: 1400px; /* Limit container width */
  box-sizing: border-box; 
  min-height: 500px;
  overflow-y:hidden ;
  margin: -100px 0 0 40px; 
  padding: 0 0 0 100px;
}

/* BOOKMARK ITEM */
.bookmark-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
}

/* Hover Effect */
.bookmark-item:hover {
  transform: translateY(-8px); /* Slight lift on hover */
}

/* NO RESULTS MESSAGE */
.no-results {
  color: #777;
  font-style: italic;
  text-align: center;
  margin-top: 20px;
}

/* RESPONSIVENESS */

/* Medium screens */
@media (max-width: 1024px) {
  .bookmark-list {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

/* Small screens */
@media (max-width: 600px) {
  h1 {
    font-size: 1.8rem;
  }

  .bookmark-list {
    grid-template-columns: 1fr; 
  }

  .search-bar {
    width: 90%; /* Full width for smaller screens */
  }

  
}
</style>
