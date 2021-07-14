# Welcome to the SmartLogic.io website

This repository is for hosting smartlogic.io on GitHub Pages.

# Development

You can run the website locally via:

Install [asdf](https://asdf-vm.com/#/core-manage-asdf) and [asdf-ruby](https://github.com/asdf-vm/asdf-ruby)

```bash
cd smartlogic.io/

# Make sure you have the correct version of ruby
asdf install

bundle install
bundle exec jekyll serve
```

Then open [https://127.0.0.1:4000](https://127.0.0.1:4000)

# Deployment

- Commit your changes
- Push to the `main` branch
- Github Actions will take over and build the jeykll site and make a new commit to `gh-pages`, which is served via a VPS on [smartlogic.io](http://smartlogic.io)

If nginx needs to be updated, please see the [smartlogic-io-deploy](https://github.com/smartlogic/smartlogic-io-deploy) repo.

# Checking Links

Look for links that don't point anywhere

- Run `jekyll build`
- Run `rake link_check`

# Manually updating the podcast

If you need to trigger a podcast update outside of the RSS workflow, you can run the `podcast.rb` script. After updating the podcast in Fireside:

```bash
ruby ./_scripts/podcast.rb
git add _data/
git commit

# Regular deployment
git push origin main
```

## Transcripts

To add a new transcript for a podcast:

- Put the transcript in the [podcast/elixir-wizards/transcripts](https://github.com/smartlogic/smartlogic.io/tree/main/podcast/elixir-wizards/transcripts) folder
- Edit [_data/elixir_wizards_transcripts.yml](https://github.com/smartlogic/smartlogic.io/blob/main/_data/elixir_wizards_transcripts.yml)
- The new episode slug (this will match the episode slug in fireside) will be a top level key
- Underneath that key will include the language of the transcript, along with a direct link to the transcript path added earlier
