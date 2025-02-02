import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './style.scss';
import { useState, useEffect } from 'react';
import { SelectControl, PanelBody, TextControl, Spinner,ComboboxControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import penguine_image from './logo.svg';
import conf from './conf';

/**
 * Edit component for the biblio-bestseller-block.
 * This component allows users to select a genre and displays the bestsellers for that genre.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.attributes - Block attributes.
 * @param {string} props.attributes.genre - Selected genre.
 * @param {string} props.attributes.title - Title of the book heading.
 * @param {Function} props.setAttributes - Function to update block attributes.
 *
 * @returns {JSX.Element} The Edit component.
 */
const Edit = ({ attributes, setAttributes }) => {
    const { genre, title } = attributes;
    const [genres, setGenres] = useState([]);
    const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
    const [editingHeading, setEditingHeading] = useState(false); // New state to manage heading editing
    const [bookHeading, setBookHeading] = useState(title || "Bestsellers"); // New state for book heading

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		fetch(`${conf.biblioGenresEndpoint}?rows=15&catSetId=PW&api_key=${conf.biblioAPIkey}`, { signal })
			.then((res) => res.json())
			.then((data) => {
				setGenres(data.data.categories || []);
			})
			.catch((error) => {
				if (error.name !== 'AbortError') {
					console.error('Error fetching genres:', error);
				}
			});

		return () => {
			controller.abort();
		};
	}, []);

	useEffect(() => {
		if (genre) {
			setLoading(true);
			const controller = new AbortController();
			const signal = controller.signal;

			fetch(`${conf.biblioBooksEndpoint}?rows=1&catUri=${genre}&catSetId=PW&sort=weeklySales&dir=desc&api_key=${conf.biblioAPIkey}`, { signal })
				.then((res) => res.json())
				.then((data) => {
					setBooks(data.data.works || []);
					setLoading(false);
				})
				.catch((error) => {
					if (error.name !== 'AbortError') {
						console.error('Error fetching books:', error);
					}
					setLoading(false);
				});

			return () => {
				controller.abort();
			};
		}
	}, [genre]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "biblio-bestseller-block")}>
					<SelectControl
						label={__("Select Genre", "biblio-bestseller-block")}
						value={genre}
						options={[
							{ label: __("Select a genre", "biblio-bestseller-block"), value: '' },
							...genres.map((g) => ({
								label: g.description || __("Unknown", "biblio-bestseller-block"),
								value: g.catUri || '',
							})),
						]}
						onChange={(value) => setAttributes({ genre: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{!genre && (
					<ComboboxControl
						label={__("Choose Genre", "biblio-bestseller-block")}
						options={[
							{ label: __("Select a genre", "biblio-bestseller-block"), value: '' },
							...genres.map((g) => ({
								label: g.description || __("Unknown", "biblio-bestseller-block"),
								value: g.catUri || '',
							})),
						]}
						value={genre}
						onChange={(value) => setAttributes({ genre: value })}
						allowReset
					/>
				)}

				{loading ? (
					<Spinner />
				) : books.length > 0 ? (
					<div className="book_container">
						{editingHeading ? (
							<TextControl
								label={__("Edit Book Heading", "biblio-bestseller-block")}
								value={bookHeading}
								onChange={(value) => setBookHeading(value)}
								onBlur={() => {
									setAttributes({ title: bookHeading });
									setEditingHeading(false);
								}}
							/>
						) : (
							<h2
								className="book_heading"
								onClick={() => setEditingHeading(true)} // Enable editing on click
								style={{ cursor: 'pointer' }}
								title={__("Click to edit heading", "biblio-bestseller-block")}
							>
								{bookHeading}
							</h2>
						)}
						<div className="book">
							<a href={`https://www.penguin.co.uk/${encodeURIComponent(books[0].seoFriendlyUrl)}`} target="_blank" rel="noopener noreferrer">
								<img src={books[0].coverUrls.large.coverUrl} alt={books[0].title} />
							</a>
							<a href={`https://www.penguin.co.uk/${encodeURIComponent(books[0].seoFriendlyUrl)}`} target="_blank" rel="noopener noreferrer">
								<h3 className="book_title">{books[0].title}</h3>
							</a>
							<p className="book_author_name">
								{books[0].authors
									.slice(0, 2)
									.map((author) => author.authorDisplay)
									.join(', ')}
							</p>
							<a
								className="book_buy_now"
								href={
									books[0].affiliateLinks.find(
										(link) => link.affiliateType === 'amazon'
									)?.url
								}
								target="_blank"
								rel="noopener noreferrer"
							>
								{__("Buy From Amazon", "biblio-bestseller-block")}
							</a>
							<div className="book_deco">
								<a
									href={`https://www.penguin.co.uk/${encodeURIComponent(books[0].seoFriendlyUrl)}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={penguine_image}
										alt={__("Penguin Logo", "biblio-bestseller-block")}
										className="book_deco_image"
									/>
								</a>
							</div>
						</div>
					</div>
				) : (
					<p>{__("No books available. Try selecting the genre first.", "biblio-bestseller-block")}</p>
				)}
			</div>
		</>
	);
};

export default Edit;

 