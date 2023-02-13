export const cleanString = (str) =>
  str
    .replace(/]|[[ ""]/g, "")
    .replace(/[/]/, ", ")
    .replace(/,/, ", ");
