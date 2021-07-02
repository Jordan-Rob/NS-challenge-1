const createPostElements = () => {
    
  const userId = localStorage.getItem("userId");    
  const cardSection = document.getElementById('cards-area');
  const baseLink = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  let myHeaders = new Headers();
  
  myHeaders.append('Content-Type', 'application/json');
  
  let requestOptions = {
    headers: myHeaders,
  };


  //Get a list of users
  const getUsersPosts = async () => {
  
    requestOptions.method = 'GET';
    const response = await fetch(baseLink , requestOptions);
    if (response.status === 200) {
      const data = await response.json();
      const posts = data;

      console.log(posts)

      
      //Add posts to cards section
      posts.forEach((post) => {
        // create a new div column element
        const col = document.createElement("div");
        col.className = "col-4";

        //create a new div card element & add it to column
        const card = document.createElement("div")
        card.className = "card shadow p-3";
        card.style.width = "21rem"
        card.style.height = "24rem"
  
        const cardBody = document.createElement("div")
        cardBody.className = "card-body"

  
        cardBody.innerHTML = `
                              <h5 class="card-title"> ${post.title}</h5>
                              <p class="card-text"> ${post.body}</p>
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

  getUsersPosts();
  
  
  
  }
  
  