# What To Cook

[what-to-took.site](https://what-to-cook.site)

This is a website for looking for recipes, saving them in a personal account, and creating a shopping list with ingredients that are missing from what you need to cook.

What-To-Cook is a fullstack project with **React-Redux** architecture on a client side and **Node(Koa)-Mongo** on a server side. Project was deployed on a **VPS with Ubuntu-NGINX**.

It's a personal pet project, that allows to learn, test and implement JavaScript features.

## Main Functionality

1. Finding recipes with query. For this task [Edamam API](https://www.edamam.com/) used. It was necessary to take into account limitations of API: every request returns just 1 portion of data (20 pieces or less), structure and type of requesting data.
2. Filtering recipes by cooking time, type of dish, cuisine or meal. All filters apply at the same time. The selected filters are automatically applied to the new portion of data (after click on button Find more).
3. Creating a user account with an e-mail or third-party apps authorization: github, google and facebook.
4. Resetting a password flow
5. Saving favorite recipes into a user account
6. Saving ingredients from saved recipes into a shopping list. Editing and printing the shopping list.

## To Do

- [ ] Allow to have multiple lists of ingredients
- [ ] Add a toggling between different languages
- [ ] Store images of saved recipes in Amazon S3
- [ ] Add animations
- [ ] Implement tooltips
- [ ] Create a real-time WebSocket Chat Module
- [ ] Migrate to TypeScript
