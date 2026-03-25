"use client";

import { useState, useEffect } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );

  const data = await response.json();
  return data.meals || [];
}

export default function MealIdeas({ ingredient }: { ingredient: string }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  async function loadMealIdeas() {
    if (!ingredient) {
      setMeals([]);
      return;
    }

    const mealIdeas = await fetchMealIdeas(ingredient);
    setMeals(mealIdeas);
  }

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Meal Ideas</h2>

      {!ingredient && (
        <p className="text-gray-600">
          Select an item from the shopping list to see meal ideas.
        </p>
      )}

      {ingredient && meals.length === 0 && (
        <p className="text-gray-700">
          No meal ideas found for{" "}
          <span className="uppercase text-blue-600 font-bold">
            {ingredient}
          </span>.
        </p>
      )}

      {ingredient && meals.length > 0 && (
        <>
          <p className="mb-4">
            {" "}
            <span className="uppercase text-indigo-600 font-bold">
              {ingredient}
            </span>
          </p>

          <ul className="space-y-4">
            {meals.map((meal) => (
              <li
                key={meal.idMeal}
                className="flex items-center gap-4 border p-3 rounded-lg"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width={80}
                  height={80}
                  className="rounded-md"
                />

                <span className="font-medium">{meal.strMeal}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}