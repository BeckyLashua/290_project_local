document.addEventListener('DOMContentLoaded', function(event) {
  console.log("DOM fully loaded and parsed");
  let rat = {
			"id": 0,
			"name": "Prishe",
			"imgUrl": "images/Prishe.jpg",
			"imgCredit": "https://unsplash.com/",
			"imgAlt": "rat looking around curiously",
			"age": 19,
			"sex": "female",
			"favoriteTreat": "Grapes",
			"description": "Prishe loves to lay around in the hammock, along with her best friends.",
			"active": 1 
  };

  let body = document.body;

  function fetchJSONData(path, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if(httpRequest.readyState == 4 & httpRequest.status == 200) {
        let data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    } 
    httpRequest.open('GET', path, true);
    httpRequest.send(); 
  }

  fetchJSONData('../views/data/ratties.json', function(data) {
    console.log(data);
  });
  // Add event listener to each of the rats
  let ratPics = document.getElementsByClassName('ratPic');
  for (const ratPic of ratPics) {
    ratPic.addEventListener('click', function(event) {
      // clear out modal from last time it was populated with data
      let modal = document.getElementById('ratModalBody');
      modal.innerHTML = "";

      /* Make an http request to the server 
      let req = new XMLHttpRequest();
      req.open("GET", "../views/data/ratties.json", true);
      req.send(null);
      console.log(JSON.parse(req.responseText));
      */
      
      // Save data in a rat object
  
      // Create unorder list element to append rattie data to
      const ratInfoList = document.createElement('ul');
      ratInfoList.setAttribute('style', 'list-style: none');

      // Create list element and add name value to it
      const ratNameLi = document.createElement('li');
      ratNameLi.innerHTML = rat['name'];

      // Create list element and append img to it
      const ratImgLi = document.createElement('li');
      const ratImg = document.createElement('img');
      ratImg.setAttribute('src', rat['imgUrl']);
      ratImg.setAttribute('alt', rat['imgAlt']);
      ratImgLi.appendChild(ratImg);
      
      // Create list element and add age value to it
      const ratAgeLi = document.createElement('li');
      ratAgeLi.innerHTML = 'Age: ' + rat['age'] + ' months';

      // Create list element and add sex value to it
      const ratSexLi = document.createElement('li');
      ratSexLi.innerHTML = 'Sex: ' + rat['sex'];

      // Create list element and add favorite treat to it
      const ratTreatLi = document.createElement('li');
      ratTreatLi.innerHTML = 'Favorite Treat: ' + rat['favoriteTreat'];

      // Create list element and add description to it
      const ratDescLi = document.createElement('li');
      ratDescLi.innerHTML = rat['description'];

      // Append all of the list elements to the list
      // Add break lines in between list items
      ratInfoList.appendChild(ratNameLi);
      ratInfoList.appendChild(document.createElement('br')); 
      ratInfoList.appendChild(ratImgLi);
      ratInfoList.appendChild(document.createElement('br'));
      ratInfoList.appendChild(ratAgeLi);
      ratInfoList.appendChild(document.createElement('br'));
      ratInfoList.appendChild(ratSexLi);
      ratInfoList.appendChild(document.createElement('br'));
      ratInfoList.appendChild(ratTreatLi);
      ratInfoList.appendChild(document.createElement('br'));
      ratInfoList.appendChild(ratDescLi);
    
      // append list element to modal body
      modal.appendChild(ratInfoList);
    });
  }
});





