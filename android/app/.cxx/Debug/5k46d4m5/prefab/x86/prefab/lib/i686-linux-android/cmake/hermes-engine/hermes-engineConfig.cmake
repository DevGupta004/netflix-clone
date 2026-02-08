if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/e5000938/.gradle/caches/8.10.2/transforms/87eeee2d2675fe15b59d009b02701665/transformed/hermes-android-0.76.5-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/e5000938/.gradle/caches/8.10.2/transforms/87eeee2d2675fe15b59d009b02701665/transformed/hermes-android-0.76.5-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

