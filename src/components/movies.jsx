import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';

class Movies extends Component {
	state = {
		movies: getMovies()
	};

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLiked = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	}

	render() {
		const { length: count } = this.state.movies;
		if (this.state.movies.length === 0)
			return <p>There are no movies in the database</p>;

		return (
			<>
				<p>Showing {count} movies in the database.</p>
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Title</th>
							<th scope='col'>Genre</th>
							<th scope='col'>Stock</th>
							<th scope='col'>Rate</th>
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody>
						{this.state.movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like liked={movie.liked} onLikeToggle={() => this.handleLiked(movie)} />
								</td>
								<td>
									<button
										className='btn btn-danger btn-sm'
										onClick={() => this.handleDelete(movie)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	}
}

export default Movies;
