case "$ENV" in
    "prod")
     echo "Switching to Firebase prod environment."
    #  yes | cp -rf "firebase/prod/google-services.json" android/app
    #  yes | cp -rf "firebase/prod/GoogleService-Info.plist" ios
     yes | cp -rf ".env.production" ".env"
     node ./encryption.js .env.production
     ;;
     "stage")
    echo "Switching to Firebase stage environment."
    yes | cp -rf "firebase/stag/google-services.json" android/app
    yes | cp -rf "firebase/stag/GoogleService-Info.plist" ios
    yes | cp -rf ".env.staging" ".env"
    node src/utils/encryption/encryption.js .env.staging && eslint --fix src/utils/encryption/Config.js
    ;;
     "dev")
     echo "Switching to Firebase dev environment."
    #  yes | cp -rf "firebase/dev/google-services.json" android/app
    #  yes | cp -rf "firebase/dev/GoogleService-Info.plist" ios
     yes | cp -rf ".env.dev" ".env"
     node ./encryption.js .env.dev
     ;;
      "uat")
     echo "Switching to Firebase UAT environment."
     yes | cp -rf "firebase/uat/google-services.json" android/app
     yes | cp -rf "firebase/uat/GoogleService-Info.plist" ios
     yes | cp -rf ".env.uat" ".env"
     node src/utils/encryption/encryption.js .env.uat && eslint --fix src/utils/encryption/Config.js
     ;;
esac