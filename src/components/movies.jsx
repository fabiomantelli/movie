import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';

class Movies extends Component {
	state = {
		movies: getMovies(),
		currentPage: 1,
		pageSize: 3,
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
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, movies: allMovies } = this.state;

		if (this.state.movies.length === 0)
			return <p>There are no movies in the database</p>;

		const movies = paginate(allMovies, currentPage, pageSize);

		return (
			<>
				<p>Showing {count} movies in the database.</p>
				<div className='row'>
					<div className='col col-lg-2'>
						<ul class='list-group'>
							<li class='list-group-item'>An item</li>
							<li class='list-group-item'>A second item</li>
							<li class='list-group-item'>A third item</li>
							<li class='list-group-item'>A fourth item</li>
							<li class='list-group-item'>And a fifth one</li>
						</ul>
					</div>
					<div className='col'>
						<table className='table'>
							<thead>
								<tr>
									<th scope='col'>Title</th>
									<th scope='col'>Genre</th>
									<th scope='col'>Stock</th>
									<th scope='col'>Rate</th>
									<th scope='col'></th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody>
								{movies.map((movie) => (
									<tr key={movie._id}>
										<td>{movie.title}</td>
										<td>{movie.genre.name}</td>
										<td>{movie.numberInStock}</td>
										<td>{movie.dailyRentalRate}</td>
										<td>
											<Like
												liked={movie.liked}
												onClick={() => this.handleLiked(movie)}
											/>
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
					</div>
				</div>

				<Pagination
					itemsCount={count}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={this.handlePageChange}
				/>
			</>
		);
	}
}

Pagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Movies;
