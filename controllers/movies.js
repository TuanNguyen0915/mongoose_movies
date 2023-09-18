import { Movie } from "../models/movie.js"

function newMovie(req, res) {
  res.render("movies/new", {
    title: "Add Movie"
  })
}

function create(req, res) {
  req.body.nowShowing = !!req.body.nowShowing
  if (req.body.cast) {
    req.body.cast = req.body.cast.split(', ')
  }
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Movie.create(req.body)
    .then(movie => {
      res.redirect("/movies")
    })
    .catch(err => {
      console.log(err);
      res.redirect("/movies")
    })
}

function index(req, res) {
  Movie.find({})
    .then(movies => {
      res.render('movies/index', {
        movies,
        title: "All Movies"
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect("/movies/")
    })
}

function show(req, res) {
  Movie.findById(req.params.movieId)
    .then(movie => {
      res.render('movies/show', {
        movie: movie,
        title: "Movie Details"
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect("/movies/")
    })
}

function deleteMovie(req, res) {
  Movie.findByIdAndDelete(req.params.movieId)
    .then(movie => {
      res.redirect("/movies")
    })
    .catch(err => {
      console.log(err);
      res.redirect("/movies")
    })
}

function edit(req, res) {
  Movie.findById(req.params.movieId)
    .then(movie => {
      res.render("movies/edit", {
        movie: movie,
        title: "Edit Movie"
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect("/movies")
    })
}

function update(req, res) {
  req.body.nowShowing = !!req.body.nowShowing
  if (req.body.cast) {
    req.body.cast = req.body.cast.split(', ')
  }
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true })
    .then(movie => {
      res.redirect(`/movies/${movie._id}`)
    })
    .catch(err => {
      console.log(err);
      res.redirect("/movies")
    })
}

export { newMovie as new, create, index, show, deleteMovie as delete, edit, update }