window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  const getMovies = () => {
    fetch(`http://localhost:3031/api/movies`)
      .then(response => response.json())
      .then(movies => console.log(movies.data))
  }

  const getMoviesAsync = async () => {
    try {
      const resPeliculas = await fetch(`http://localhost:3031/api/movies`)
      const peliculas = await resPeliculas.json()
      // Codigo que debemos usar para mostrar los datos en el frontend
      printMovies(peliculas)
    } catch (error) {
      console.log(error)
    }
  }

const getMoviesAxios = async () => {
  try {
    const resPeliculas = await axios(`http://localhost:3031/api/movies`)
    printMovies(resPeliculas.data)
  } catch(error) {
    console.log(error.message)
  }
}

  const printMovies = (peliculas) => {
    let data = peliculas.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;
      
      duracion.addEventListener("click", (e) =>{ 
        let id = JSON.parse(localStorage.getItem("id"))
        if(!id){
          id = [movie.id]
          localStorage.setItem("id", JSON.stringify(id))
        }else if(!id.includes(movie.id)){
          id.push(movie.id) 
          localStorage.setItem("id", JSON.stringify(id))
        }
      })

      document.querySelector('.btnFav').addEventListener("click", (e) =>{
        location.href = 'favoritas.html'
      })

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      h1.addEventListener('click', () =>{
        location.href = `formulario.html?id=${movie.id}`
      })

    });

    const movies = document.querySelectorAll(".card")
    
    /* movies.forEach((movie) => {
      movie.addEventListener('click', () =>{

        console.log(movie)
      })

    }) */
  }

  getMoviesAxios()



  /* const printMovies = async () => {
    const movies = await getMoviesAsync()
    console.log(movies)
  }
  printMovies()  */
  
};
