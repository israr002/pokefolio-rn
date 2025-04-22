package com.pokefolio

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.util.Base64
import android.webkit.URLUtil
import androidx.palette.graphics.Palette
import com.facebook.react.bridge.*
import kotlinx.coroutines.*
import java.net.URI

class ImageColorsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val service = CoroutineScope(Dispatchers.IO)

    override fun getName(): String {
        return "ImageColors"
    }

    private fun parseFallbackColor(hex: String): String {
        if (!hex.matches(Regex("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"))) {
            throw Exception("Invalid fallback hex color. Must be in the format #ffffff or #fff")
        }

        return if (hex.length == 7) {
            hex
        } else {
            "#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}"
        }
    }

    private fun getHex(rgb: Int): String {
        return String.format("#%06X", 0xFFFFFF and rgb)
    }

    @ReactMethod
    fun getColors(uri: String, fallback: String = "#FFFFFF", promise: Promise) {
        service.launch {
            try {
                val fallbackColor = parseFallbackColor(fallback)
                val fallbackColorInt = Color.parseColor(fallbackColor)
                var image: Bitmap? = null

                if (uri.startsWith("data:image")) {
                    val base64Uri = uri.split(",")[1]
                    val decodedBytes = Base64.decode(base64Uri, Base64.DEFAULT)
                    image = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
                } else if (URLUtil.isValidUrl(uri)) {
                    val parsedUri = URI(uri)
                    image = BitmapFactory.decodeStream(parsedUri.toURL().openStream())
                }

                if (image == null) {
                    throw Exception("Failed to load image")
                }

                try {
                    val palette = Palette.from(image).generate()
                    val vibrant = getHex(palette.getVibrantColor(fallbackColorInt))
                    val dominant = getHex(palette.getDominantColor(fallbackColorInt))
                    val finalColor = if (vibrant.equals("#FFFFFF", ignoreCase = true)) dominant else vibrant
                    promise.resolve(finalColor)
                    
                } catch (err: Exception) {
                    promise.resolve(fallbackColor)
                }
            } catch (err: Exception) {
                promise.reject("ImageColors", err.message, err)
            }
        }
    }
}
