# NetflixClone ProGuard Rules

# React Native
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.react.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.uimanager.** { *; }

# ExecuTorch - Keep all native methods and JNI bindings
-keep class org.pytorch.executorch.** { *; }
-keep class com.swmansion.rnexecutorch.** { *; }
-keepclassmembers class * {
    native <methods>;
}

# MMKV
-keep class com.tencent.mmkv.** { *; }

# Zustand state management
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod *;
}

# Keep annotations
-keepattributes *Annotation*
-keepattributes Signature
-keepattributes SourceFile,LineNumberTable

# Keep Parcelables
-keepnames class * implements android.os.Parcelable {
    public static final ** CREATOR;
}

# Keep Serializable
-keepnames class * implements java.io.Serializable
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    !static !transient <fields>;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# OkHttp
-dontwarn okhttp3.**
-dontwarn okio.**

# Flipper (debug only)
-dontwarn com.facebook.flipper.**
