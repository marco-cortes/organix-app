pipeline {
    agent any

    environment {
        IMAGE_NAME = "organix-app"
        IMAGE_TAG = "latest"
        K8S_NAMESPACE = "default"
        DOCKER_REGISTRY = "localhost:5000" // si no usás registry, quitá esto
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/marco-cortes/organix-app.git', credentials: 'github-credentials'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push Image (opcional)') {
            when {
                expression { return env.DOCKER_REGISTRY != "" }
            }
            steps {
                script {
                    sh """
                    docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                    docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Deploy to KS3') {
            steps {
                script {
                    sh 'kubectl apply -f k8s/deployment.yaml'
                    sh 'kubectl apply -f k8s/service.yaml'
                }
            }
        }
    }
}
