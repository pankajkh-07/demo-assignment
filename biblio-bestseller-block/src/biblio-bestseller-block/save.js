const { useBlockProps } = wp.blockEditor;

/**
 * Save function for the biblio-bestseller-block.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.attributes - The attributes object.
 * @param {string} props.attributes.genre - The genre of the bestseller.
 * @param {string} props.attributes.title - The title of the bestseller.
 * @returns {JSX.Element} The save component.
 */
const save = (props) => {
    const blockProps = useBlockProps.save();
    const { genre, title } = props.attributes;
    return (
        <div
            className="biblio-bestseller-block"
				data-genre={genre}
				data-title={title}
            {...blockProps}
        >
            <h2>{title}</h2>
            <p>{genre}</p>
        </div>
    );
};

export default save; 

