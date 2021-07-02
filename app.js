

const createUserElements = () =>{ 


  const cardSection = document.getElementById('cards-area');
  const baseLink = 'https://jsonplaceholder.typicode.com/users';
  let myHeaders = new Headers();
  
  myHeaders.append('Content-Type', 'application/json');
  
  let requestOptions = {
    headers: myHeaders,
  };
  
  
  //Get a list of users
  const getUsers = async () => {
  
    requestOptions.method = 'GET';
    const response = await fetch(baseLink , requestOptions);
    if (response.status === 200) {
      const data = await response.json();
      const users = data;

      console.log(users)
      
      //Add courses to the table
      users.forEach((user) => {
        // create a new div column element
        const col = document.createElement("div");
        col.className = "col-4";

        //create a new div card element & add it to column
        const card = document.createElement("div")
        card.className = "card shadow p-3";
        card.style.width = "18rem"
  
        const cardBody = document.createElement("div")
        cardBody.className = "card-body"
  
        cardBody.innerHTML = `
                              <h5 class="card-title">name: ${user.name}</h5>
                              <h6 class="card-subtitle mb-2 text-muted">username: ${user.username}</h6>
                              <h6 class="card-subtitle mb-2 text-muted">email: ${user.email}</h6>
                              <p class="card-text">address: ${user.address.street}, ${user.address.city}</p>
                              <p class="card-text">phone: ${user.phone}</p>
                              <p class="card-text">website: ${user.website}</p>
  
                            `
  
        card.append(cardBody);
  
        col.append(card);

        cardSection.appendChild(col);
      });
    } else {
      const div = document.createElement('div');
      const message = `Something went wrong with your request (${response.status})`;
      div.innerHTML = message;
      document.body.appendChild(div);
    }
  };

  getUsers();

}

