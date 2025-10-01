# Notes

Notes about books I've been reading

## Overview

This is a Jekyll site with a custom theme for organizing and displaying book notes. Each book has its own markdown file with structured content including key concepts, quotes, and personal takeaways.

## Getting Started

### Prerequisites

- Ruby (version 3.0 or higher)
- Bundler

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bundle install
   ```

### Running Locally

Build the site:
```bash
bundle exec jekyll build
```

Serve the site locally:
```bash
bundle exec jekyll serve
```

Then visit `http://localhost:4000` in your browser.

## Adding Book Notes

To add a new book note, create a new markdown file in the `_books` directory following this naming convention: `bookname.md` (e.g., `atomic-habits.md`, `thinking-fast-and-slow.md`).

### Book Note Template

```markdown
---
title: Book Title
author: Author Name
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
---

## Overview

Brief overview of the book...

## Key Concepts

Main ideas and concepts...

## Important Quotes

Notable quotes from the book...

## Personal Takeaways

Your insights and reflections...
```

## Project Structure

```
.
├── _books/              # Book note markdown files
├── _includes/           # Reusable HTML components
│   ├── header.html
│   └── footer.html
├── _layouts/            # Page layouts
│   ├── default.html     # Base layout
│   └── book.html        # Book note layout
├── assets/
│   └── css/
│       └── style.css    # Custom theme styles
├── _config.yml          # Jekyll configuration
├── index.md             # Homepage
├── books.md             # All books listing page
└── Gemfile              # Ruby dependencies
```

## Customization

### Theme Colors

Edit `assets/css/style.css` to customize the color scheme and styling.

### Site Configuration

Edit `_config.yml` to change the site title, description, and other settings.

## License

This repository is for personal use.
