require 'html-proofer'

task :link_check do
  options = {
    assume_extension: true,
    check_opengraph: true,
    check_img_http: true,
    enforce_https: true,
    http_status_ignore: [999],
  }
  HTMLProofer.check_directory("./_site", options).run
end
