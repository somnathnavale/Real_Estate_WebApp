# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

//problems faced
1) what data should i store, what should be project structure should i use, do in need redux , if then how to use it. 
2) how to store images (should i use multer or any other solution is there)
3) filtering functionality, how to implement at frontend and for how to write mongoose query
4) how to improve functionality for pagination, starting i was making api calls for each page change then i started storing that data same listings variable and show data from listings depend upon page from (page*limit-1 to page*limit) but problem with approach is that when 1 switched to random pages eg, from page 1 to 7 then i am storing page 7 data just after page 1 data, and if now i open page 2 the that data will be stored after page 7 data in listings so on page 2 also i was seeing page 7 data so thst was issue, to solve that i have created cache state which store backend api results against search query if same query exists then return same data if query not present in cache then api call is made and that data is stored in cache for future use that whole thing improve user experience. from pagination i was creating my own pagination component i was thinking of showing only 5 page buttons so there i face little difficullty while showing them
5) i faced some challenge in getting categorywise data if data is not present for any category so that was little challenging

//issues to solve

1) seperate error state for each api calls from like getAll, getOne, add,deleteOne pagewise different
2) reload generate token on reload  
3) add pagination and improve filter functionality - done 
4) add city as an option 
5) email notifications for forgot password, user validation once successfull entry,
6) add google maps
7) think about locality wise data showing
8) images from google firebase
9) placeholders for add listings 
10) if possile add login using google
11) wishlist listings