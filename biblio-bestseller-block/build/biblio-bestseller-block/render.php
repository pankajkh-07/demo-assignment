<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<?php
$genre = $attributes['genre'] ?? 'fiction';
$title = $attributes['title'] ?? 'Bestseller';

?>
<div class="biblio-bestseller-block" data-genre="<?php echo esc_attr($genre); ?>">
    <h2><?php echo esc_html($title); ?></h2>
    <p>Discover the top books in the <?php echo esc_html($genre); ?> genre!</p>
</div>