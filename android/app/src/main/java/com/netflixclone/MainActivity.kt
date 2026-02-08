package com.netflixclone

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * NetflixClone MainActivity
 */
class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String = "NetflixClone"

    /**
     * Returns the instance of the [ReactActivityDelegate].
     * We use [DefaultReactActivityDelegate] which allows you to enable New Architecture
     * with a single boolean flag [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    /**
     * Called when the activity is first created.
     * We override this to set the window background to black for a smoother
     * transition while React Native loads.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        // Set initial window background to black to match our dark theme
        window.decorView.setBackgroundColor(android.graphics.Color.BLACK)
        super.onCreate(savedInstanceState)
    }
}
