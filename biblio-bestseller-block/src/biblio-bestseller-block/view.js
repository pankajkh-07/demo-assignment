import { useEffect, useState, useCallback } from '@wordpress/element';
import conf from './conf';
import penguine_image from './logo.svg';


/**
 * BiblioBestsellerBlock component fetches and displays the bestseller book information for a given genre.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.genre='fiction'] - The genre of the bestseller book to fetch.
 * @param {string} [props.title='Bestseller'] - The title to display for the bestseller section.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <BiblioBestsellerBlock genre="non-fiction" title="Top Non-Fiction Bestseller" />
 */
const BiblioBestsellerBlock = ({ genre = 'fiction', title = 'Bestseller' }) => {
    const [message, setMessage] = useState('Loading...');
    const [book, setBooks] = useState(null);

    const fetchBestseller = useCallback(async (genre) => {
        try {
            const response = await fetch(`${conf.biblioBooksEndpoint}?rows=1&catUri=${genre}&catSetId=PW&sort=weeklySales&dir=desc&api_key=${conf.biblioAPIkey}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            if (data && data.data && data.data.works && data.data.works.length > 0) {
                const book_data = data.data.works[0];
                setBooks(book_data);
                setMessage('');
            } else {
                setMessage(`No bestsellers found for the ${genre} genre.`);
            }
        } catch (error) {
            console.error('Error fetching bestseller:', error);
            setMessage('Failed to load bestseller book information. Please try again later.');
        }
    }, []);

    useEffect(() => {
        fetchBestseller(genre);
    }, [fetchBestseller, genre]);

    return (
        <div
            className="biblio-bestseller-block"
            data-genre={genre}
        >
            {message && <p className="error-message">{message}</p>}
            {book && (
                <div className="book_container">
                    <h2 className='book_heading'>{title || "Bestsellers"}</h2>
                    <div className="book">
                        <a href={`https://www.penguin.co.uk/${book.seoFriendlyUrl}`} target="_blank" rel="noopener noreferrer">
                            <img src={`${book.coverUrls.large.coverUrl}`} alt={`${book.title}`} />
                        </a>
                        <a href={`https://www.penguin.co.uk/${book.seoFriendlyUrl}`} target="_blank" rel="noopener noreferrer">
                            <h3 className='book_title'>{book.title}</h3>
                        </a>
                        <p className='book_author_name'>{book.authors.slice(0, 2).map(author => author.authorDisplay).join(', ')}</p>
                        <a className="book_buy_now" href={`${book.affiliateLinks.find(link => link.affiliateType === 'amazon')?.url}`} target="_blank" rel="noopener noreferrer">Buy From Amazon</a>
                        <div className="book_deco">
                            <a href={`https://www.penguin.co.uk/${book.seoFriendlyUrl}`} target="_blank" rel="noopener noreferrer"><img src={penguine_image} alt="Penguin Logo" className="book_deco_image" /></a>							
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Render the block on the frontend
document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.wp-block-create-block-biblio-bestseller-block');
    blocks.forEach((block) => {
        const genre = block.dataset.genre || 'fiction';
        const title = block.querySelector('h2')?.innerText || 'Bestseller';

        wp.element.render(
            <BiblioBestsellerBlock genre={genre} title={title} />,
            block
        );
    });
});

