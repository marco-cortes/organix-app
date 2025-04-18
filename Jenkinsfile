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
                git url: 'https://github.com/usuario/mi-repo.git'
            }
        }

        stage('Build Docker') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Deploy to k3s') {
            steps {
                sh '''
                    kubectl set image deployment/$DEPLOYMENT $DEPLOYMENT=$IMAGE \
                      --namespace=$NAMESPACE || echo "Deployment aún no existe"
                '''
            }
        }

        stage('Apply deployment si no existe') {
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml || true'
            }
        }
    }
}
