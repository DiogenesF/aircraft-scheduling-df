# Running the project

After cloning the project, just run

`yarn install`

followed by 

`yarn start`

After it finishes starting up, a tab will be opened on [http://localhost:3000](http://localhost:3000) with the application up and running

# Assumptions:

- As the aircrafts are all based in EGKK and there's no flights from this location, **the starting location for the aircrafts are `LFSB`**
- The removal of the flights from the rotation follow the LIFO method. This way, **you can remove only one flight at a time and starting by flights that were added last in the rotation**

# Focus:

I prioritized the development based on the criteria used for the evaluation. So functionality was the most focused part, and visual design the least one
