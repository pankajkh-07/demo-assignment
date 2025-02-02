
# Biblio Bestseller Block

- Contributors:      PankajKh
- Tags:              block
- Tested up to:      6.7
- Stable tag:        0.1.0
- License:           GPL-2.0-or-later
- License URI:       https://www.gnu.org/licenses/gpl-2.0.html

### Description
The Biblio Bestseller Block is a custom Gutenberg block for WordPress that displays a list of best-selling books. This block is designed to be highly customizable and responsive, ensuring it fits seamlessly into any layout. Users can edit the block title, and the block includes links to book pages and series pages. The block fetches data from the Penguin Random House API, displaying the top-selling books in a specified genre. If no best-selling book is available, the block will display the first book from the API response.


### Installation

This section describes how to install the plugin and get it working.

e.g.

1. Upload the plugin files to the `/wp-content/plugins/biblio-bestseller-block` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

== Changelog ==

= 0.1.0 =
* Release


#### Technical Requirements

    1. Node JS / React**: Use these technologies to build the block.
    2. PHP: Integrate the block into a custom WordPress plugin.
    3. Responsive Design: Ensure the block is responsive and fits into any layout, with content horizontally centered.
    4. Editable Title: Default title should be 'Bestsellers', but it should be editable.
    5. Links: 
        - 'Buy now' button links to the book's page on amazon.co.uk.
        - Book jacket and cover link to the individual book page on penguin.co.uk.
        - Series title header links to the series page.
        - Links should be disabled in the editor but functional on the front end.
    6. Author Names: Display only the first two author names.
    7. Fallback: If the best-selling book is not available or returns a negative number, display the first book from the API response.

#### Important Info

**API Key**: Use `7fqge2qgxcdrwqbcgeywwdj2` for authentication.

**Genres Endpoint**: 

`https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.UK/categories`

- Parameters:
    - `rows`: Limit to 15 results.
    - `catSetId`: Set to `PW`.

**Books Endpoint**: 

`https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.UK/works/views/uk-list-display`

- Parameters:
    - `rows`: Number of results.
    - `catUri`: Unique ID for the genre.
    - `catSetId`: Set to `PW`.
    - `sort`: Set to `weeklySales`.
    - `dir`: Set to `desc`.

#### Mock-up Design 

    Refer to the design mock-up: [Figma Design](https://www.figma.com/design/2fQEdfumTUSGAYEl2maBDO/Developer-Test?m=dev&node-id=39-3&t=5ROfMV5l0S7Q54F6-1)

#### Testing

    - Ensure the block works in a fresh WordPress install using the default theme.
    - Write clean, well-tested code that meets the requirements.

#### Discussion

    Be prepared to discuss your approach and any challenges faced during the interview.