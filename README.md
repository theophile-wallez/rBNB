# rBNB
 A web application that allows individuals to rent a house for a set period of time, as well as to list their own property, much like Airbnb.

## About the project
### Listing
This *listing* shows all current properties available on the market. A search bar can sort properties by name, city or country. <br/>
A *contract* popup opens when a property is selected. It allows the user to rent the property by selecting the wished dates. <br/> <br/>
 <img width="1426" alt="Listing" src="https://user-images.githubusercontent.com/66305625/181637378-34d2d5e7-4a25-4a63-9a81-17a4e32f006d.png">

 ***
 
### Dashboard
 
The dashboard allows the user to add, edit or delete its properties. As well as list, or unlist a property on the global market using a toggle. <br/>
 
 <img width="1426" alt="Dashboard" src="https://user-images.githubusercontent.com/66305625/181638423-6caa1fd7-8910-4fe6-abad-78e2281f36ae.png">

 ***
 
 ### Contracts
 The *contract* page allows the user to manage its incoming or current contract. Each contract is also linked to a message room.  <br/>
 

<img width="1428" alt="Contracts" src="https://user-images.githubusercontent.com/66305625/181639562-c84b519f-2bf0-479e-a5a6-f038ee80615d.png">

 ***
 
 ### Message room
 The *message* room allows the owner and the tenant to exchange informations about the contract. It is made with Firebase.<br/>

<img width="1426" alt="Message" src="https://user-images.githubusercontent.com/66305625/181639820-805aa15c-ab42-4bcc-8787-80148eac1978.png">

🔗 <a href="https://rbnb.up.railway.app/listing" target="_blank">Visit website<a/><br/>
🔗 <a href="https://rbnb-backend.up.railway.app/swagger-ui.html" target="_blank">Visit API's Swagger<a/>


## Open locally
### <img src="https://user-images.githubusercontent.com/66305625/181633397-8188e71d-2db2-471f-bb81-14aadf90745d.svg" width="15" height="15"> Frontend
The frontend of the web application is made with **Angular**. To open the website locally, you need to install <a href="https://nodejs.org/en/" >Node.js<a/> and the <a href="https://angular.io/cli" >Angular CLI<a/>.
Then, in your terminal, open the `frontend` folder and do the following command: <br/><br/>
*install the required Node modules:*
```sh
npm i
```
<br/>

*open the website in your favorite browser:*
```sh
ng serve -o
```
### <img src="https://user-images.githubusercontent.com/66305625/181633012-d1093a2f-292d-4b85-9235-f05fe9b7baf1.svg" width="15" height="15"> Backend

The backend is made with **Spring**. To run the backend, open the `backend` folder in your favorite IDE, install the **Maven** dependencies and run the program.
 
 ## 🛠 Tech stack

- <img src="https://user-images.githubusercontent.com/66305625/181633012-d1093a2f-292d-4b85-9235-f05fe9b7baf1.svg" width="15" height="15"> Java Spring (backend)
- <img src="https://user-images.githubusercontent.com/66305625/181633397-8188e71d-2db2-471f-bb81-14aadf90745d.svg" width="15" height="15"> Angular (frontend)
- <img src="https://user-images.githubusercontent.com/66305625/181641417-3e13da7f-05d6-4d3e-ac8c-a81b4263a0d5.svg" width="15" height="15"> Firebase (database)



