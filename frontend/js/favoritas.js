window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  let idStorage

    const getMovieById = async (id) => {
      const pelicula = await axios(`http://localhost:3031/api/movies/${id}`)
      printFav(pelicula.data.data)
  }

  if(localStorage.getItem("id")){
    idStorage = JSON.parse(localStorage.getItem("id"))
    idStorage.forEach(element => {
      getMovieById(element)
    });
  }else {
    console.log("No hay favoritos yet!")
  }

const printFav = (movie) => {
  
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  const h1 = document.createElement("h1");
  h1.textContent = movie.title;

  const p = document.createElement("p");
  p.textContent = `Rating: ${movie.rating}`;

  const duracion = document.createElement("p");
  duracion.textContent = `Duración: ${movie.length}`;

  container.appendChild(card);
  card.appendChild(h1);
  card.appendChild(p);
  if (movie.genre !== null) {
    const genero = document.createElement("p");
    genero.textContent = `Genero: ${movie.genre.name}`;
    card.appendChild(genero);
  }
  card.appendChild(duracion);
}

  /** Codigo que debemos usar para mostrar los datos en el frontend
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

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
    });
  */
};
