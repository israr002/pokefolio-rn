import Foundation
import UIKit
import React

@objc(ImageColors)
class ImageColors: NSObject {

    enum ERRORS {
        static let INVALID_URL = "Invalid URL."
        static let DOWNLOAD_ERR = "Could not download image."
        static let PARSE_ERR = "Could not parse image."
        static let INVALID_FALLBACK_COLOR = "Invalid fallback hex color. Must be in the format #ffffff or #fff."
    }

    private func toHexString(color: UIColor) -> String {
        let comp = color.cgColor.components

        let r: CGFloat = comp?[0] ?? 0
        let g: CGFloat = comp?[1] ?? 0
        let b: CGFloat = (comp?.count ?? 0) > 2 ? comp![2] : g

        let rgb: Int = Int(r * 255) << 16 | Int(g * 255) << 8 | Int(b * 255)

        return String(format: "#%06X", rgb)
    }

    private func parseFallbackColor(hexColor: String) -> String? {
        let regex = try! NSRegularExpression(pattern: "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", options: .caseInsensitive)

        let range = NSRange(location: 0, length: hexColor.utf16.count)
        let match = regex.firstMatch(in: hexColor, options: [], range: range)

        guard match != nil else { return nil }

        if hexColor.count == 7 {
            return hexColor
        }

        let red = String(hexColor[hexColor.index(hexColor.startIndex, offsetBy: 1)])
        let green = String(hexColor[hexColor.index(hexColor.startIndex, offsetBy: 2)])
        let blue = String(hexColor[hexColor.index(hexColor.startIndex, offsetBy: 3)])

        return "#\(red)\(red)\(green)\(green)\(blue)\(blue)"
    }

    @objc
    func getColors(_ uri: String, fallback: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        guard let fallbackColor = parseFallbackColor(hexColor: fallback) else {
            reject("INVALID_COLOR", ERRORS.INVALID_FALLBACK_COLOR, nil as NSError?)
            return
        }

        guard let url = URL(string: uri) else {
            reject("INVALID_URL", ERRORS.INVALID_URL, nil as NSError?)
            return
        }

        var request = URLRequest(url: url)

        URLSession.shared.dataTask(with: request) { data, _, error in
            guard let data = data, error == nil else {
                reject("DOWNLOAD_ERR", ERRORS.DOWNLOAD_ERR, error)
                return
            }

            guard let image = UIImage(data: data) else {
                reject("PARSE_ERR", ERRORS.PARSE_ERR, nil)
                return
            }

            // image.getColors(quality: UIImageColorsQuality.high) { colors in
            //     var result: [String: String] = ["platform": "ios"]
            //     result["background"] = colors?.background.map(self.toHexString) ?? fallbackColor
            //     result["primary"] = colors?.primary.map(self.toHexString) ?? fallbackColor
            //     result["secondary"] = colors?.secondary.map(self.toHexString) ?? fallbackColor
            //     result["detail"] = colors?.detail.map(self.toHexString) ?? fallbackColor

            //     resolve(result)
            // }
            image.getColors(quality: UIImageColorsQuality.high) { colors in
  
                let secondaryColor = colors?.secondary.map(self.toHexString) ?? fallbackColor
                let detailColor = colors?.detail.map(self.toHexString) ?? fallbackColor
                let finalColor = (secondaryColor == "#000000") ? detailColor : secondaryColor

                resolve(finalColor) 
            }

        }.resume()
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}

