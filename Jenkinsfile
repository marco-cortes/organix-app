pipeline {
    agent any

    environment {
        GIT_CREDENTIALS = "github-credentials"
        GIT_URL = "https://github.com/marco-cortes/organix-app.git"
        GIT_BRANCH = "main"
        IMAGE_NAME = "organix-app"
        PORT_SERVICE = "80"
        PORT_CONTAINER = "30000"
        HOST_REGISTRY = "localhost:5000"
        HOST_DEV = "http://localhost:3000"
        HOST_PROD = "http://187.33.150.229:${PORT_CONTAINER}"
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                git credentialsId: "${env.GIT_CREDENTIALS}", url: "${env.GIT_URL}", branch: "${env.GIT_BRANCH}"
            }
        }

        stage('Reemplazar URL en rspack.config.ts') {
            steps {
                script {
                    sh """
                        if [ -f rspack.config.ts ]; then
                            sed -i 's|"${env.HOST_DEV}"|"${env.HOST_PROD}"|g' rspack.config.ts
                        fi
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    env.IMAGE_TAG = imageTag
                    def fullImage = "${HOST_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
                    
                    sh "docker build -t ${fullImage} ."
                    sh "docker push ${fullImage}"
                }
            }
        }

        stage('Deploy en Kubernetes') {
            steps {
                script {
                    sh """
                        export HOST_REGISTRY=${HOST_REGISTRY}
                        export IMAGE_NAME=${IMAGE_NAME}
                        export IMAGE_TAG=${IMAGE_TAG}
                        export PORT_CONTAINER=${PORT_CONTAINER}
                        export PORT_SERVICE=${PORT_SERVICE}
                        export HOST_PROD=${HOST_PROD}
                        envsubst < k8s/deployment.yaml | kubectl apply -f -
                        envsubst < k8s/service.yaml | kubectl apply -f -
                        kubectl delete pod -l app=${IMAGE_NAME} --ignore-not-found
                    """
                }
            }
        }
        
        stage('Limpiar Imagenes docker') {
            steps {
                script {
                    sh 'docker image prune -a -f'
                }
            }
        }
    }
}
