# Welcome to the SmartLogic.io website

This repository is for hosting smartlogic.io on GitHub Pages.

# Development

You can run the website locally via:

- Run `bundle install`
- Run `bundle exec jekyll serve`

Then open [https://127.0.0.1:4000](https://127.0.0.1:4000)

# Deployment

- Commit your changes
- Push to the `main` branch
- Github Actions will take over and build the jeykll site and make a new commit to `gh-pages`, which is served via Github Pages on [smartlogic.io](http://smartlogic.io)

# Checking Links

Look for links that don't point anywhere

- Run `jekyll build`
- Run `rake link_check`
