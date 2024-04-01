export const RECIPE_DETAILS= (recipe_id = ":recipe_id")=>{
    return `/recipe/${recipe_id}`;
}
export const USER_DETAILS= (username = ":username")=>{
    return `/profile/${username}`;
}