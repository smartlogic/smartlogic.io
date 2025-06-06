#/bin/env ruby

require 'date'
require 'faraday'
require 'nokogiri'
require 'yaml'
require 'faraday/follow_redirects'

def parse_date(date)
  Date.parse(date).strftime("%B %e, %Y")
end

response = Faraday.get("https://feeds.fireside.fm/smartlogic/rss")

unless response.success?
  raise "There was an issue fetching the RSS feed"
end

rss_xml = Nokogiri::XML(response.body)

fallback_image = rss_xml.xpath("//channel/itunes:image").first.attributes["href"].value

items = rss_xml.xpath("//channel/item").map do |item|
  {
    "title" => item.xpath("title").text,
    "slug" => item.xpath("link").text.gsub("https://smartlogic.io/podcast/elixir-wizards/", ""),
    "link" => item.xpath("link").text,
    "guid" => item.xpath("guid").text,
    "pubDate" => item.xpath("pubDate").text,
    "pubDateFriendly" => parse_date(item.xpath("pubDate").text),
    "description" => item.xpath("description").text,
    "author" => item.xpath("author").text,
    "embedUrl" => item.xpath("fireside:playerURL").text,
    "enclosure" => {
      "url" => item.xpath("enclosure").first.attributes["url"].value,
      "length" => item.xpath("enclosure").first.attributes["length"].value,
      "type" => item.xpath("enclosure").first.attributes["type"].value,
    },
    "itunes" => {
      "episodeType" => item.xpath("itunes:episodeType").text,
      "season" => item.xpath("itunes:season").text,
      "author" => item.xpath("itunes:author").text,
      "subtitle" => item.xpath("itunes:subtitle").text,
      "duration" => item.xpath("itunes:duration").text,
      "explicit" => item.xpath("itunes:explicit").text,
      "keywords" => item.xpath("itunes:keywords").text,
      "image" => (item.xpath("itunes:image").first.attributes["href"].value rescue fallback_image),
      "summary" => item.xpath("itunes:summary").text,
    },
    "contentEncoded" => item.xpath("content:encoded").text
  }
end

transcripts = YAML.load(File.read("_data/elixir_wizards_transcripts.yml"))

transcripts = rss_xml.xpath("//channel/item").reduce(transcripts) do |transcripts, item|
  slug = item.xpath("link").text.gsub("https://smartlogic.io/podcast/elixir-wizards/", "")
  transcript_path = "podcast/elixir-wizards/transcripts/#{slug}.txt"

  transcript = item.xpath("podcast:transcript").first

  if transcript
    transcript_url = transcript.attributes["url"].value

    unless File.exist?(transcript_path)
      conn = Faraday.new(url: transcript_url) do |faraday|
        faraday.response :follow_redirects # use Faraday::FollowRedirects::Middleware
      end
      response = conn.get(transcript_url)

      if response.success?
        File.write(transcript_path, response.body)
        transcripts[slug] ||= {}
        transcripts[slug]["English"] = "/#{transcript_path}"
      else
        puts "Couldn't get transcript for #{slug} #{transcript_url} due to #{response.status} on #{response.env.url}"
        transcripts.delete(slug)
      end
    end
  end

  transcripts
end

rss_map = {
  "title" => rss_xml.xpath("//channel/title").text,
  "pubDate" => rss_xml.xpath("//channel/pubDate").text,
  "link" => "https://smartlogic.io/podcast/elixir-wizards",
  "description" => rss_xml.xpath("//channel/description").text,
  "items" => items,
  "itunes" => {
    "type" => rss_xml.xpath("//channel/itunes:type").text,
    "subtitle" => rss_xml.xpath("//channel/itunes:subtitle").text,
    "author" => rss_xml.xpath("//channel/itunes:author").text,
    "summary" => rss_xml.xpath("//channel/itunes:summary").text,
    "image" => rss_xml.xpath("//channel/itunes:image").first.attributes["href"].value,
    "explicit" => rss_xml.xpath("//channel/itunes:explicit").text,
    "keywords" => rss_xml.xpath("//channel/itunes:keywords").text,
    "owner" => {
      "name" => rss_xml.xpath("//channel/itunes:owner/itunes:name").text,
      "email" => rss_xml.xpath("//channel/itunes:owner/itunes:email").text,
    },
  },
}

seasons = items.group_by do |item|
  "Season #{item["itunes"]["season"]}"
end

seasons.each do |season, items|
  seasons[season] = items.sort_by do |item|
    Date.parse(item["pubDate"])
  end.reverse
end

File.write("_data/elixir_wizards_feed.yml", rss_map.to_yaml)
File.write("_data/elixir_wizards_episodes.yml", items.to_yaml)
File.write("_data/elixir_wizards_seasons.yml", seasons.to_yaml)
File.write("_data/elixir_wizards_transcripts.yml", transcripts.to_yaml)
