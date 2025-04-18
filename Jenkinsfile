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
                git branch: 'main',
                url: 'https://github.com/marco-cortes/organix-app.git',
                credentialsId: 'github-credentials'
            }
        }

        // stage('Build Vue') {
        //     steps {
        //         sh 'npm install'
        //         sh 'npm run build'
        //     }
        // }

        stage('Build Docker') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Deploy to k3s') {
            steps {
                sh '''
                    kubectl apply -f ./k8s/deployment.yaml
                    kubectl apply -f ./k8s/service.yaml
                    kubectl apply -f ./k8s/ingress.yaml
                    kubectl rollout restart deployment/$DEPLOYMENT
                '''
            }
        }
    }
}
