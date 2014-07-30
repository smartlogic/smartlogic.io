# Welcome to the SmartLogic.io website

This repository is for hosting smartlogic.io on GitHub Pages.

# Development

Run `bundle exec foreman start`

The site will be at (http://localhost:4000)[http://localhost:4000]

Use ctrl-c to quit

Be sure to commit the output css from the sass generation, GitHub pages will not 
process anything in the _sass folder

## Details

Foreman and the Procfile run these two commands and it kills them both when you 
ctrl-c the foreman process

    bundle exec jekyll serve -w
    bundle exec scss --watch _sass:css
