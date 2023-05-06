export function generateStarsArray(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starsArray = Array(fullStars).fill("fas fa-star");

  if (hasHalfStar) {
    starsArray.push("far fa-star-half");
  }

  starsArray.push(...Array(emptyStars).fill("far fa-star"));

  return starsArray;
}
