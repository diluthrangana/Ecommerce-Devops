pipeline {
    agent any

    environment {
        // Provided by user
        ACR_URL = "ruhunaecommerceacr.azurecr.io"
        AZURE_CRED_ID = "azure-registry-credentials"
        
        // Image name
        IMAGE_NAME = "ecommerce-frontend"
        
        // For Vite build-arg (Update this with your actual API Gateway URL in Azure)
        API_GATEWAY_URL = "https://auth-service.jollymeadow-0e869f40.southeastasia.azurecontainerapps.io" 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Lint & Build Test') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run lint'
                    // We don't build here if we do it in Docker, but it's good for early failure
                }
            }
        }

        stage('Build and Push Image') {
            steps {
                script {
                    dir('frontend') {
                        // Using Docker tool to build and push
                        docker.withRegistry("https://${env.ACR_URL}", env.AZURE_CRED_ID) {
                            def customImage = docker.build("${env.ACR_URL}/${env.IMAGE_NAME}:${env.BUILD_NUMBER}", "--build-arg VITE_API_GATEWAY_URL=${env.API_GATEWAY_URL} .")
                            customImage.push()
                            customImage.push("latest")
                        }
                    }
                }
            }
        }

        stage('Clean up') {
            steps {
                sh "docker rmi ${env.ACR_URL}/${env.IMAGE_NAME}:${env.BUILD_NUMBER}"
                sh "docker rmi ${env.ACR_URL}/${env.IMAGE_NAME}:latest"
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
