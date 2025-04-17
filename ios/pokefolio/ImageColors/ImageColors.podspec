require 'json'

package = JSON.parse(File.read(File.join(__dir__, '../../../package.json')))

Pod::Spec.new do |s|
  s.name         = "ImageColors"
  s.version      = package['version']
  s.summary      = "Image color extraction for React Native"
  s.homepage     = "https://github.com/israr002/pokefolio-rn"
  s.license      = "MIT"
  s.platform     = :ios, "11.0"
  s.source       = { :git => "https://github.com/israr002/pokefolio-rn.git", :tag => "#{s.version}" }
  s.source_files = "*.{h,m,swift}"
  s.requires_arc = true
  s.dependency "React-Core"
end 