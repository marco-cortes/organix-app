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
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Tag y Push al registry local') {
            steps {
                script {
                    def fullImage = "${LOCAL_REGISTRY}/${IMAGE_NAME}:latest"
                    sh "docker tag ${IMAGE_NAME}:latest ${fullImage}"
                    sh "docker push ${fullImage}"
                }
            }
        }

        stage('Deploy en Kubernetes') {
            steps {
                sh "kubectl apply -f k8s/deployment.yaml"
                sh "kubectl apply -f k8s/service.yaml"
            }
        }
    }
}
