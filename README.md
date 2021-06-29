# Frontity Gravity Forms

Gravity forms package for [Frontity](https://frontity.org).

# How does it work?

1. You need to create a page in your WordPress site (if you don't already have one) that contains a Gravity Forms shortcode or Gutenberg block.
1. Install the Frontity Gravity Forms package as shown in the Installation steps below.
1. Visit that page in Frontity and the package will automatically render all the Gravity Forms forms that are present, including other content on the page.
1. On successful form submission, the email goes to the recipient set in the form settings in WP (if Gravity Forms email settings are configured on your WordPress site). Errors are shown as well if the fields are invalid.

# Features

1. All the Gravity Forms forms on the page will work.
1. You can also use it for multiple pages.
1. Built with React and Frontity, so its fast and performant.

# Installation

1. Do `npm install @aamodtgroup/frontity-gravity-forms` in the root of your project.
2. Add the package name in `frontity-settings.js`.

```javascript
"packages": [
  "@aamodtgroup/frontity-gravity-forms"
  // other packages ...
]
```

3. Add api keys to the state in frontity
```javascript
source: {
  gfAuth: {
    key: "ck_example",
    secret: "cs_example",
  }
}
```

4. Run `npx frontity dev` again.

That's it! The package doesn't need any settings. You should be able to see the form in any page or post that contains one.

## Credits

- Build with love :blue_heart:, using [Frontity](https://frontity.org)

## Authors

1. [Kasper Aamodt](https://twitter.com/kasperaamodt) - Owner and developer [@aamodtgroup](https://twitter.com/aamodtgroup)

## License

![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)

- **[GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)**
