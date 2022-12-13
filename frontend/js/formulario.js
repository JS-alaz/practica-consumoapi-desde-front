window.onload = () => {
    let query = new URLSearchParams(location.search)
    console.log(query.has('id'))
    const id = query.get('id')
    
    //btns
    const btnEliminar = document.querySelector('.botonBorrar')
    const btnEditar = document.querySelector('#editar')
    const btnAgregar = document.querySelector('#agregar')

     const getMovieById = async (id) => {
        const pelicula = await axios(`http://localhost:3031/api/movies/${id}`)
        setFormValues(pelicula.data.data)
    } 

    const setFormValues = (pelicula) => {
        const {title, rating, awards, release_date, length} = pelicula
        document.querySelector('#title').value = title
        document.querySelector('#rating').value = rating
        document.querySelector('#awards').value = awards
        document.querySelector('#release_date').value = release_date
        document.querySelector('#length').value = length 
    } 
       
    getMovieById(id)
    
    const crearPeliculaFetch = () => {
        fetch("http://localhost:3031/api/movies/create", {
            method: 'POST',
            body: JSON.stringify({
                title: document.querySelector('#title').value,
                rating: document.querySelector('#rating').value,
                awards: document.querySelector('#awards').value,
                release_date: document.querySelector('#release_date').value, 
                length:  document.querySelector('#length').value 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
           .then(res => res.json())
           .then((data) => console.log(data))
           .catch((err) => console.log(err))
    } 
        
    const createMovie = async() => {
        try {
            await axios({
               method: 'POST',
               url: 'http://localhost:3031/api/movies/create',
               data: {
                title: document.querySelector('#title').value,
                rating: document.querySelector('#rating').value,
                awards: document.querySelector('#awards').value,
                release_date: document.querySelector('#release_date').value, 
                length:  document.querySelector('#length').value 
               }     
           }).then(response => console.log(response.data))
        } catch (error) {
            console.log(error.message)
        }
    }
    
    btnAgregar.addEventListener('click', (e)=>{
        e.preventDefault()
        //crearPeliculaFetch()
        createMovie()
    }) 

    //editar Pelicula
    const movieUpdate = async (id) => { 
        try {
            await axios({
                method: 'PUT',
                url: `http://localhost:3031/api/movies/update/${id}`,
                data: {
                    title: document.querySelector('#title').value,
                    rating: document.querySelector('#rating').value,
                    awards: document.querySelector('#awards').value,
                    release_date: document.querySelector('#release_date').value, 
                    length:  document.querySelector('#length').value 
                },
            }).then(response => console.log(response.data))
        } catch (error) {
            console.log(error.message)
        }
    }
    btnEditar.addEventListener('click', (e)=>{
            e.preventDefault()
          movieUpdate(id)//debe recibir el id que envie una accion 
        })

    const deleteMovie = (id) => {
        try {
            axios({
                method: 'DELETE',
                url: `http://localhost:3031/api/movies/delete/${id}`,
            }).then(response => console.log(response.data))
        }catch(error){
            console.log(error.message)
        }
    }

    btnEliminar.addEventListener('click', (e)=>{
        //e.preventDefault()
        deleteMovie(id)
        alert("Pelicula eliminada, sera redirigido a Home")
        location.href = "home.html"
    })
}