package com.netflixclone

import android.view.KeyEvent
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.modules.core.DeviceEventManagerModule

/**
 * Native module that dispatches Android TV D-pad key events to JavaScript.
 * This is needed because in the new architecture (Fabric/bridgeless),
 * the built-in ReactAndroidHWInputDeviceHelper.sendEvent() may not
 * reach JS if mReactInstanceManager is null.
 */
class TVKeyEventModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "TVKeyEventModule"

    companion object {
        private val KEY_MAP = mapOf(
            KeyEvent.KEYCODE_DPAD_UP to "up",
            KeyEvent.KEYCODE_DPAD_DOWN to "down",
            KeyEvent.KEYCODE_DPAD_LEFT to "left",
            KeyEvent.KEYCODE_DPAD_RIGHT to "right",
            KeyEvent.KEYCODE_DPAD_CENTER to "select",
            KeyEvent.KEYCODE_ENTER to "select",
            KeyEvent.KEYCODE_SPACE to "select",
        )

        // Singleton to allow Activity to forward events
        var instance: TVKeyEventModule? = null
    }

    init {
        instance = this
    }

    fun dispatchKeyEvent(keyCode: Int, action: Int) {
        val eventType = KEY_MAP[keyCode] ?: return
        if (action != KeyEvent.ACTION_DOWN) return // Only handle key down

        val params = Arguments.createMap().apply {
            putString("eventType", eventType)
            putInt("eventKeyAction", action)
        }

        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("onTVKeyEvent", params)
    }
}
