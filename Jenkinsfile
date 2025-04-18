pipeline {
    agent any

    environment {
        IMAGE = 'organix-app:local'
        DEPLOYMENT = 'organix-app'
        NAMESPACE = 'default'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/marco-cortes/organix-app'
            }
        }

        stage('Build Docker') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Desplegar en k3s') {
            steps {
                sh '''
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml
                    kubectl apply -f k8s/ingress.yaml
                '''
            }
        }

        stage('Actualizar imagen') {
            steps {
                sh 'kubectl rollout restart deployment/$DEPLOYMENT'
            }
        }

    }
}
