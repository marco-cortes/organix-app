pipeline {
    agent any

    environment {
        IMAGE_NAME = "organix-app"
        LOCAL_REGISTRY = "localhost:5000"
        GIT_CREDENTIALS = 'github-credentials'
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                git credentialsId: "${env.GIT_CREDENTIALS}", url: 'https://github.com/marco-cortes/organix-app.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Obtener el hash corto del commit como tag
                    def imageTag = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    env.IMAGE_TAG = imageTag
                    def fullImage = "${LOCAL_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
                    
                    sh "docker build -t ${fullImage} ."
                    sh "docker push ${fullImage}"
                }
            }
        }

        stage('Deploy en Kubernetes') {
            steps {
                script {
                    // Reemplazar IMAGE_TAG en el archivo YAML antes de aplicar
                    sh "sed 's|IMAGE_TAG|${env.IMAGE_TAG}|g' k8s/deployment.yaml | kubectl apply -f -"
                    sh "kubectl apply -f k8s/service.yaml"
                }
            }
        }
    }
}
